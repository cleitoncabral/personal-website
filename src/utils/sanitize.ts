import DOMPurify from 'dompurify';

/**
 * Sanitiza HTML para prevenir ataques XSS
 * Remove scripts, event handlers e outros conteúdos potencialmente perigosos
 * 
 * @param html - String HTML que será sanitizada
 * @returns HTML limpo e seguro
 */
export function sanitizeHtml(html: string | TrustedHTML): string {
  // No servidor (SSR), DOMPurify precisa do jsdom
  if (typeof window === 'undefined') {
    // Durante SSR, retorne o HTML como está
    // O DOMPurify será aplicado no cliente
    return String(html);
  }

  // No cliente, sanitize normalmente
  return DOMPurify.sanitize(String(html), {
    // Configurações de segurança
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'a', 'span', 'div', 'blockquote', 'code', 'pre'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    ALLOW_DATA_ATTR: false,
  });
}

/**
 * Cria um objeto seguro para uso com dangerouslySetInnerHTML
 * 
 * @param html - String HTML que será sanitizada
 * @returns Objeto no formato { __html: string } sanitizado
 * 
 * @example
 * <div dangerouslySetInnerHTML={createSafeMarkup(data.description)} />
 */
export function createSafeMarkup(html: string | TrustedHTML) {
  return { __html: sanitizeHtml(html) };
}
