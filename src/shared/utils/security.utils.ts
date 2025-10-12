/**
 * Security Utilities
 * - Input sanitization
 * - Validation
 * - Sensitive data redaction
 */

import DOMPurify from 'dompurify';
import validator from 'validator';

// ========== SANITIZATION ==========

export const sanitizeHtml = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target'],
  });
};

export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
};

export const sanitizeObject = <T extends Record<string, any>>(obj: T): T => {
  const sanitized = { ...obj };
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeInput(sanitized[key]) as any;
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null && !Array.isArray(sanitized[key])) {
      sanitized[key] = sanitizeObject(sanitized[key]);
    } else if (Array.isArray(sanitized[key])) {
      sanitized[key] = sanitized[key].map((item: any) =>
        typeof item === 'string' ? sanitizeInput(item) : typeof item === 'object' ? sanitizeObject(item) : item
      ) as any;
    }
  }
  return sanitized;
};

// ========== VALIDATION ==========

export const isValidEmail = (email: string): boolean => validator.isEmail(email);

export const isValidPhoneNumber = (phone: string): boolean =>
  validator.isMobilePhone(phone, 'any', { strictMode: false });

export const isStrongPassword = (password: string): boolean =>
  validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });

export const containsSqlInjection = (input: string): boolean => {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi,
    /(--|\/\*|\*\/|;|'|")/g,
  ];
  return sqlPatterns.some((pattern) => pattern.test(input));
};

export const containsXss = (input: string): boolean => {
  const xssPatterns = [
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
  ];
  return xssPatterns.some((pattern) => pattern.test(input));
};

export const isInputSafe = (input: string): boolean =>
  !containsSqlInjection(input) && !containsXss(input);

// ========== REDACTION ==========

export const redactEmail = (email: string): string => {
  if (!isValidEmail(email)) return email;
  const [local, domain] = email.split('@');
  return `${local.substring(0, 2)}***@${domain}`;
};

export const redactPhoneNumber = (phone: string): string => {
  if (phone.length < 4) return '***';
  return `***${phone.slice(-4)}`;
};

export const redactSensitiveData = (
  obj: Record<string, any>,
  sensitiveFields: string[] = ['password', 'token', 'secret', 'apiKey', 'creditCard', 'ssn']
): Record<string, any> => {
  const redacted = { ...obj };
  for (const key in redacted) {
    const lowerKey = key.toLowerCase();
    if (sensitiveFields.some((field) => lowerKey.includes(field))) {
      redacted[key] = '[REDACTED]';
    } else if (typeof redacted[key] === 'object' && redacted[key] !== null && !Array.isArray(redacted[key])) {
      redacted[key] = redactSensitiveData(redacted[key], sensitiveFields);
    }
  }
  return redacted;
};
