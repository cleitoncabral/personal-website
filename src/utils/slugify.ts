/**
 * Converte um texto em slug URL-friendly
 * Exemplo: "My Awesome Project!" -> "my-awesome-project"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') // Remove acentos
    .replace(/[\u0300-\u036f]/g, '') // Remove diacríticos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/--+/g, '-') // Remove hífens duplicados
    .replace(/^-+/, '') // Remove hífens do início
    .replace(/-+$/, ''); // Remove hífens do final
}

/**
 * Cria um slug único apenas com o título do projeto
 * Formato: "nome-do-projeto"
 */
export function createProjectSlug(title: string): string {
  return slugify(title);
}

/**
 * Não usado mais - mantido para compatibilidade
 */
export function getIdFromSlug(slug: string): string {
  return slug;
}
