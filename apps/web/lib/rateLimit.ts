import { NextRequest, NextResponse } from 'next/server';

/**
 * Rate Limiting Middleware
 * 
 * Implements a simple in-memory rate limiter using a sliding window algorithm.
 * In production, this should be replaced with Redis or a similar distributed cache.
 */

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

interface RequestLog {
  count: number;
  resetTime: number;
}

// In-memory store (use Redis in production)
const requestStore = new Map<string, RequestLog>();

// Rate limit configurations by route pattern
const rateLimits: Record<string, RateLimitConfig> = {
  '/api/auth': { windowMs: 15 * 60 * 1000, maxRequests: 10 }, // 10 requests per 15 minutes
  '/api/mcp': { windowMs: 60 * 1000, maxRequests: 30 }, // 30 requests per minute
  '/api/projects': { windowMs: 60 * 1000, maxRequests: 60 }, // 60 requests per minute
  default: { windowMs: 60 * 1000, maxRequests: 100 }, // 100 requests per minute
};

/**
 * Get rate limit config for a given path
 */
function getRateLimitConfig(pathname: string): RateLimitConfig {
  for (const [pattern, config] of Object.entries(rateLimits)) {
    if (pattern !== 'default' && pathname.startsWith(pattern)) {
      return config;
    }
  }
  return rateLimits.default;
}

/**
 * Get client identifier (IP address + user agent)
 */
function getClientId(request: NextRequest): string {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return `${ip}:${userAgent.substring(0, 50)}`;
}

/**
 * Check if request exceeds rate limit
 */
export function checkRateLimit(request: NextRequest): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
} {
  const pathname = request.nextUrl.pathname;
  const clientId = getClientId(request);
  const config = getRateLimitConfig(pathname);
  const key = `${pathname}:${clientId}`;

  const now = Date.now();
  const requestLog = requestStore.get(key);

  if (!requestLog || now > requestLog.resetTime) {
    // Create new window
    const resetTime = now + config.windowMs;
    requestStore.set(key, { count: 1, resetTime });
    return { allowed: true, remaining: config.maxRequests - 1, resetTime };
  }

  if (requestLog.count >= config.maxRequests) {
    // Rate limit exceeded
    return { allowed: false, remaining: 0, resetTime: requestLog.resetTime };
  }

  // Increment count
  requestLog.count += 1;
  requestStore.set(key, requestLog);
  return { allowed: true, remaining: config.maxRequests - requestLog.count, resetTime: requestLog.resetTime };
}

/**
 * Apply rate limiting to a request
 */
export function rateLimit(request: NextRequest): NextResponse | null {
  const { allowed, remaining, resetTime } = checkRateLimit(request);

  if (!allowed) {
    const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': getRateLimitConfig(request.nextUrl.pathname).maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': resetTime.toString(),
        },
      }
    );
  }

  // Add rate limit headers to all responses
  return null; // Allowed - will be handled by calling code
}

/**
 * Add rate limit headers to response
 */
export function addRateLimitHeaders(request: NextRequest, response: NextResponse): NextResponse {
  const { remaining, resetTime } = checkRateLimit(request);
  const config = getRateLimitConfig(request.nextUrl.pathname);

  response.headers.set('X-RateLimit-Limit', config.maxRequests.toString());
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  response.headers.set('X-RateLimit-Reset', resetTime.toString());

  return response;
}

/**
 * Clean up expired rate limit entries (call periodically)
 */
export function cleanupRateLimits(): void {
  const now = Date.now();
  for (const [key, log] of requestStore.entries()) {
    if (now > log.resetTime) {
      requestStore.delete(key);
    }
  }
}

// Clean up every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimits, 5 * 60 * 1000);
}
