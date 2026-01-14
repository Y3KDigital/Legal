import { NextRequest } from 'next/server';
import crypto from 'crypto';

/**
 * CSRF Protection Middleware
 * 
 * Implements Double Submit Cookie pattern for CSRF protection.
 * Validates CSRF tokens on state-changing requests (POST, PUT, DELETE, PATCH).
 */

const CSRF_TOKEN_LENGTH = 32;
const CSRF_COOKIE_NAME = 'csrf-token';
const CSRF_HEADER_NAME = 'x-csrf-token';

/**
 * Generate a random CSRF token
 */
export function generateCsrfToken(): string {
  return crypto.randomBytes(CSRF_TOKEN_LENGTH).toString('hex');
}

/**
 * Verify CSRF token from request
 */
export function verifyCsrfToken(request: NextRequest): boolean {
  const method = request.method.toUpperCase();

  // CSRF protection only for state-changing methods
  if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
    return true;
  }

  // Allow auth endpoints (handled by NextAuth)
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return true;
  }

  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = request.headers.get(CSRF_HEADER_NAME);

  // Both tokens must be present and match
  if (!cookieToken || !headerToken) {
    return false;
  }

  // Constant-time comparison to prevent timing attacks
  return timingSafeEqual(cookieToken, headerToken);
}

/**
 * Timing-safe string comparison
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);

  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Get or create CSRF token for current session
 */
export function getCsrfToken(request: NextRequest): string {
  const existingToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  if (existingToken) {
    return existingToken;
  }
  return generateCsrfToken();
}

/**
 * CSRF error response
 */
export function csrfError(): Response {
  return new Response(
    JSON.stringify({ error: 'Invalid CSRF token' }),
    {
      status: 403,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
