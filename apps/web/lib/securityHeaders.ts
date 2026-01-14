import { NextRequest, NextResponse } from 'next/server';

/**
 * Security Headers Middleware
 * 
 * Adds comprehensive security headers to all responses to protect against
 * common web vulnerabilities.
 */

export interface SecurityHeadersConfig {
  // Content Security Policy
  csp?: string;
  
  // Enable HSTS (HTTP Strict Transport Security)
  hsts?: boolean;
  hstsMaxAge?: number;
  hstsIncludeSubDomains?: boolean;
  hstsPreload?: boolean;
  
  // Frame options
  frameOptions?: 'DENY' | 'SAMEORIGIN';
  
  // Content type options
  noSniff?: boolean;
  
  // XSS Protection
  xssProtection?: boolean;
  
  // Referrer Policy
  referrerPolicy?: string;
  
  // Permissions Policy
  permissionsPolicy?: string;
}

const defaultConfig: Required<SecurityHeadersConfig> = {
  csp: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js requires unsafe-eval and unsafe-inline in dev
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.openai.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
  hsts: true,
  hstsMaxAge: 31536000, // 1 year
  hstsIncludeSubDomains: true,
  hstsPreload: true,
  frameOptions: 'DENY',
  noSniff: true,
  xssProtection: true,
  referrerPolicy: 'strict-origin-when-cross-origin',
  permissionsPolicy: [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'interest-cohort=()',
  ].join(', '),
};

/**
 * Apply security headers to response
 */
export function addSecurityHeaders(
  response: NextResponse,
  config: SecurityHeadersConfig = {}
): NextResponse {
  const finalConfig = { ...defaultConfig, ...config };

  // Content Security Policy
  if (finalConfig.csp) {
    response.headers.set('Content-Security-Policy', finalConfig.csp);
  }

  // HTTP Strict Transport Security
  if (finalConfig.hsts) {
    const hstsValue = [
      `max-age=${finalConfig.hstsMaxAge}`,
      finalConfig.hstsIncludeSubDomains && 'includeSubDomains',
      finalConfig.hstsPreload && 'preload',
    ]
      .filter(Boolean)
      .join('; ');
    response.headers.set('Strict-Transport-Security', hstsValue);
  }

  // X-Frame-Options
  if (finalConfig.frameOptions) {
    response.headers.set('X-Frame-Options', finalConfig.frameOptions);
  }

  // X-Content-Type-Options
  if (finalConfig.noSniff) {
    response.headers.set('X-Content-Type-Options', 'nosniff');
  }

  // X-XSS-Protection
  if (finalConfig.xssProtection) {
    response.headers.set('X-XSS-Protection', '1; mode=block');
  }

  // Referrer-Policy
  if (finalConfig.referrerPolicy) {
    response.headers.set('Referrer-Policy', finalConfig.referrerPolicy);
  }

  // Permissions-Policy
  if (finalConfig.permissionsPolicy) {
    response.headers.set('Permissions-Policy', finalConfig.permissionsPolicy);
  }

  // Additional security headers
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');

  return response;
}

/**
 * Get security headers as object (for Next.js config)
 */
export function getSecurityHeaders(config: SecurityHeadersConfig = {}): Record<string, string> {
  const finalConfig = { ...defaultConfig, ...config };
  const headers: Record<string, string> = {};

  if (finalConfig.csp) {
    headers['Content-Security-Policy'] = finalConfig.csp;
  }

  if (finalConfig.hsts) {
    const hstsValue = [
      `max-age=${finalConfig.hstsMaxAge}`,
      finalConfig.hstsIncludeSubDomains && 'includeSubDomains',
      finalConfig.hstsPreload && 'preload',
    ]
      .filter(Boolean)
      .join('; ');
    headers['Strict-Transport-Security'] = hstsValue;
  }

  if (finalConfig.frameOptions) {
    headers['X-Frame-Options'] = finalConfig.frameOptions;
  }

  if (finalConfig.noSniff) {
    headers['X-Content-Type-Options'] = 'nosniff';
  }

  if (finalConfig.xssProtection) {
    headers['X-XSS-Protection'] = '1; mode=block';
  }

  if (finalConfig.referrerPolicy) {
    headers['Referrer-Policy'] = finalConfig.referrerPolicy;
  }

  if (finalConfig.permissionsPolicy) {
    headers['Permissions-Policy'] = finalConfig.permissionsPolicy;
  }

  headers['X-DNS-Prefetch-Control'] = 'off';
  headers['X-Download-Options'] = 'noopen';
  headers['X-Permitted-Cross-Domain-Policies'] = 'none';

  return headers;
}
