/**
 * Sanitizes user-provided text on the client by stripping HTML/script tags,
 * control characters, and enforcing a maximum character length.
 */
export function sanitizeInputText(input: string, maxLength = 250): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/\0/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Validates that a phone number contains 10-15 digits (allowing +, spaces, hyphens).
 */
export function isValidPhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return /^\+?[0-9]{10,15}$/.test(cleaned);
}

/**
 * Validates optional email format.
 */
export function isValidEmailAddress(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed) return true;
  if (trimmed.length > 160) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

/**
 * Safely parses JSON from localStorage with prototype-pollution protection
 * and runtime type validation.
 */
export function safeParseStorage<T>(
  key: string,
  fallback: T,
  validator?: (parsed: unknown) => boolean
): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw, (k, v) => {
      if (k === '__proto__' || k === 'constructor' || k === 'prototype') {
        return undefined;
      }
      return v;
    });
    if (validator && !validator(parsed)) {
      return fallback;
    }
    return (parsed as T) ?? fallback;
  } catch {
    return fallback;
  }
}
