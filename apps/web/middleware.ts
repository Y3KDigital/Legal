import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { rateLimit, addRateLimitHeaders } from './lib/rateLimit';
import { verifyCsrfToken, csrfError, getCsrfToken } from './lib/csrf';
import { addSecurityHeaders } from './lib/securityHeaders';
import { logAuditEvent, AuditEventType, getRequestContext } from './lib/auditLog';

// Protected routes that require authentication
const protectedPaths = [
  '/app',
  '/api/mcp',
];

// Public routes that don't require authentication
const publicPaths = [
  '/',
  '/auth',
  '/api/auth',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Rate Limiting (all requests)
  const rateLimitResponse = rateLimit(request);
  if (rateLimitResponse) {
    // Log rate limit exceeded
    const context = getRequestContext(request);
    await logAuditEvent({
      type: AuditEventType.RATE_LIMIT_EXCEEDED,
      ...context,
      result: 'failure',
      metadata: { path: pathname },
      timestamp: new Date(),
    });
    return rateLimitResponse;
  }

  // 2. CSRF Protection (state-changing requests)
  if (!verifyCsrfToken(request)) {
    // Log CSRF violation
    const context = getRequestContext(request);
    await logAuditEvent({
      type: AuditEventType.CSRF_VIOLATION,
      ...context,
      result: 'failure',
      metadata: { path: pathname, method: request.method },
      timestamp: new Date(),
    });
    return csrfError();
  }

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // Allow public paths
  if (isPublicPath && !isProtectedPath) {
    const response = NextResponse.next();
    
    // Add CSRF token cookie for public paths
    const csrfToken = getCsrfToken(request);
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
    
    // Add security headers
    addSecurityHeaders(response);
    
    // Add rate limit headers
    addRateLimitHeaders(request, response);
    
    return response;
  }

  // 3. Authentication (protected paths)
  if (isProtectedPath) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Redirect to sign-in if not authenticated
    if (!token) {
      // Log unauthorized access attempt
      const context = getRequestContext(request);
      await logAuditEvent({
        type: AuditEventType.UNAUTHORIZED_ACCESS,
        ...context,
        result: 'failure',
        metadata: { path: pathname },
        timestamp: new Date(),
      });
      
      const signInUrl = new URL('/auth/signin', request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Add user info to headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', token.id as string);
    requestHeaders.set('x-user-role', token.role as string);
    requestHeaders.set('x-user-email', token.email as string);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    
    // Add CSRF token cookie
    const csrfToken = getCsrfToken(request);
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
    
    // Add security headers
    addSecurityHeaders(response);
    
    // Add rate limit headers
    addRateLimitHeaders(request, response);
    
    return response;
  }

  const response = NextResponse.next();
  
  // Add security headers to all responses
  addSecurityHeaders(response);
  
  // Add rate limit headers
  addRateLimitHeaders(request, response);
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
