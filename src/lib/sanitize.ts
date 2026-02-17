/**
 * Input sanitization utilities for XSS prevention
 */

/**
 * Sanitize a string by removing potentially dangerous HTML/script content
 */
export function sanitizeString(input: string): string {
    if (!input) return '';

    // Remove script tags and their content
    let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // Remove event handlers (onclick, onerror, etc.)
    sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
    sanitized = sanitized.replace(/on\w+\s*=\s*[^\s>]*/gi, '');

    // Remove javascript: protocol
    sanitized = sanitized.replace(/javascript:/gi, '');

    // Remove data: protocol (can be used for XSS)
    sanitized = sanitized.replace(/data:text\/html/gi, '');

    return sanitized.trim();
}

/**
 * Sanitize and validate an email address
 */
export function sanitizeEmail(email: string): string {
    if (!email) return '';

    // Remove whitespace
    const cleaned = email.trim().toLowerCase();

    // Basic email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleaned)) {
        return '';
    }

    // Additional sanitization
    return sanitizeString(cleaned);
}

/**
 * Sanitize a URL to ensure it's safe
 */
export function sanitizeUrl(url: string): string {
    if (!url) return '';

    const trimmed = url.trim();

    // Blocklist dangerous protocols
    const dangerousProtocols = /^(javascript|data|vbscript|file):/i;

    if (dangerousProtocols.test(trimmed)) {
        return '';
    }

    // Only allow http, https, and relative URLs
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) {
        return trimmed;
    }

    // If no protocol and doesn't start with /, assume https
    return trimmed;
}

/**
 * Escape HTML special characters to prevent XSS
 */
export function escapeHtml(text: string): string {
    if (!text) return '';

    const htmlEscapeMap: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
    };

    return text.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char] || char);
}

/**
 * Sanitize form input with options
 */
export function sanitizeFormInput(
    input: string,
    options: {
        maxLength?: number;
        allowedChars?: RegExp;
        trim?: boolean;
    } = {}
): string {
    if (!input) return '';

    let sanitized = input;

    // Trim whitespace if requested (default: true)
    if (options.trim !== false) {
        sanitized = sanitized.trim();
    }

    // Apply max length
    if (options.maxLength && sanitized.length > options.maxLength) {
        sanitized = sanitized.substring(0, options.maxLength);
    }

    // Filter by allowed characters if specified
    if (options.allowedChars) {
        sanitized = sanitized.replace(new RegExp(`[^${options.allowedChars.source}]`, 'g'), '');
    }

    // Remove dangerous content
    sanitized = sanitizeString(sanitized);

    return sanitized;
}
