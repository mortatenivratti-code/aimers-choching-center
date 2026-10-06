import { Request, Response, NextFunction } from 'express';

/**
 * Strips HTML tags, script payloads, null bytes, and control characters,
 * and enforces a strict maximum character length.
 */
export function sanitizeText(input: unknown, maxLength = 250): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/\0/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Clamps a numeric input to a safe finite integer range.
 */
export function clampInteger(
  input: unknown,
  min: number,
  max: number,
  fallback: number
): number {
  const num = Number(input);
  if (!Number.isFinite(num)) return fallback;
  return Math.max(min, Math.min(max, Math.round(num)));
}

/**
 * Validates that a value belongs to an explicit allowlist.
 */
export function validateEnum<T extends string>(
  input: unknown,
  allowed: readonly T[],
  fallback: T
): T {
  if (typeof input === 'string' && (allowed as readonly string[]).includes(input)) {
    return input as T;
  }
  return fallback;
}

/**
 * Validates mobile number format (10-15 digits, optional + / spaces / hyphens).
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return /^\+?[0-9]{10,15}$/.test(cleaned);
}

/**
 * Validates email format if provided.
 */
export function isValidEmail(email: string): boolean {
  if (!email) return true;
  if (email.length > 160) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

/**
 * Sets comprehensive HTTP Security Headers on all responses.
 * Note: frame-ancestors allows AI Studio preview hosts while blocking unauthorized third-party framing.
 */
export function securityHeadersMiddleware(
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://*.firebaseapp.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https://images.unsplash.com https://*.googleusercontent.com",
      "connect-src 'self' https://*.supabase.co https://*.googleapis.com https://*.firebaseio.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com wss://*.firebaseio.com",
      "frame-src 'self' https://*.firebaseapp.com https://accounts.google.com",
      "frame-ancestors 'self' https://*.google.com https://*.scf.usercontent.goog https://*.run.app",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')
  );

  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
  );
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');

  next();
}

/**
 * Protects state-changing API routes against Cross-Site Request Forgery (CSRF)
 * and unauthorized cross-origin mutations by verifying Origin/Referer and JSON Content-Type.
 */
export function csrfAndOriginGuard(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    const contentType = req.headers['content-type'] || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      res.status(415).json({ error: 'Unsupported Media Type: application/json required' });
      return;
    }

    const origin = req.headers.origin;
    const host = req.headers.host;
    if (origin && host) {
      try {
        const originUrl = new URL(origin);
        if (originUrl.host !== host) {
          res.status(403).json({ error: 'Forbidden: Cross-origin request blocked' });
          return;
        }
      } catch {
        res.status(403).json({ error: 'Forbidden: Invalid Origin header' });
        return;
      }
    }
  }
  next();
}

interface RateBucket {
  count: number;
  resetAt: number;
}

/**
 * Sliding-window in-memory rate limiter for API abuse protection.
 */
export function createRateLimiter(options: {
  windowMs: number;
  maxRequests: number;
  keyPrefix?: string;
}) {
  const buckets = new Map<string, RateBucket>();

  // Periodic cleanup of expired buckets every 5 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets.entries()) {
      if (bucket.resetAt <= now) {
        buckets.delete(key);
      }
    }
  }, 5 * 60 * 1000).unref();

  return (req: Request, res: Response, next: NextFunction): void => {
    const forwarded = req.headers['x-forwarded-for'];
    const clientIp =
      typeof forwarded === 'string'
        ? forwarded.split(',')[0].trim()
        : req.ip || req.socket.remoteAddress || 'unknown';

    const key = `${options.keyPrefix || 'api'}:${clientIp}`;
    const now = Date.now();
    const existing = buckets.get(key);

    if (!existing || existing.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + options.windowMs });
      res.setHeader('X-RateLimit-Limit', String(options.maxRequests));
      res.setHeader('X-RateLimit-Remaining', String(options.maxRequests - 1));
      next();
      return;
    }

    existing.count += 1;
    const remaining = Math.max(0, options.maxRequests - existing.count);
    res.setHeader('X-RateLimit-Limit', String(options.maxRequests));
    res.setHeader('X-RateLimit-Remaining', String(remaining));

    if (existing.count > options.maxRequests) {
      const retryAfterSec = Math.ceil((existing.resetAt - now) / 1000);
      res.setHeader('Retry-After', String(retryAfterSec));
      res.status(429).json({
        error: 'Too many requests. Please wait a moment before trying again.',
      });
      return;
    }

    next();
  };
}
