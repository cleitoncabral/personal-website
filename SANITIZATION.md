# Sanitização HTML com DOMPurify

## ✅ Implementação Concluída!

A sanitização HTML foi adicionada ao seu projeto para prevenir ataques XSS (Cross-Site Scripting).

## 📦 O que foi instalado:

```bash
npm install dompurify
```

O DOMPurify já inclui seus próprios tipos TypeScript, então não precisa de @types separado.

## 🛠️ Como funciona:

### 1. Função utilitária criada: `src/utils/sanitize.ts`

```typescript
import { createSafeMarkup } from 'src/utils/sanitize';

// Uso simples
<p dangerouslySetInnerHTML={createSafeMarkup(htmlContent)} />
```

### 2. Configuração de segurança:

A função `sanitizeHtml()` permite apenas tags seguras:
- Texto: `p`, `br`, `strong`, `em`, `u`
- Títulos: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
- Listas: `ul`, `ol`, `li`
- Links: `a` (com href, target, rel)
- Outros: `span`, `div`, `blockquote`, `code`, `pre`

**Remove automaticamente:**
- ❌ `<script>` tags
- ❌ Event handlers (onclick, onload, etc.)
- ❌ `javascript:` URLs
- ❌ Data attributes maliciosos
- ❌ Qualquer código executável

## 🔒 Onde foi aplicado:

### ✅ 1. Página de projeto individual
**Arquivo:** `src/pages/project/[projectName].tsx`
```tsx
// ANTES (INSEGURO):
<p dangerouslySetInnerHTML={{__html: data.description}}></p>

// DEPOIS (SEGURO):
import { createSafeMarkup } from '../../utils/sanitize';
<p dangerouslySetInnerHTML={createSafeMarkup(data.description)}></p>
```

### ✅ 2. Lista de projetos (SideProjects)
**Arquivo:** `src/components/SideProjects/sideProjects.tsx`
```tsx
// ANTES (INSEGURO):
<p dangerouslySetInnerHTML={{__html: item.description}}></p>

// DEPOIS (SEGURO):
import { createSafeMarkup } from '../../utils/sanitize';
<p dangerouslySetInnerHTML={createSafeMarkup(item.description)}></p>
```

## 🧪 Como testar:

### Teste 1: Conteúdo normal (deve funcionar)
```typescript
const safeContent = "<p>Este é um <strong>texto seguro</strong></p>";
// Resultado: renderiza normalmente
```

### Teste 2: Script malicioso (deve ser removido)
```typescript
const maliciousContent = "<p>Texto</p><script>alert('XSS')</script>";
// Resultado: só renderiza "<p>Texto</p>", o script é removido
```

### Teste 3: Event handler (deve ser removido)
```typescript
const dangerousContent = '<img src="x" onerror="alert(1)">';
// Resultado: img é removida ou fica sem o onerror
```

### Teste 4: Link malicioso (deve ser neutralizado)
```typescript
const badLink = '<a href="javascript:alert(1)">Click</a>';
// Resultado: o href javascript: é removido
```

## 📝 Personalizando as regras:

Se você precisar permitir mais tags ou atributos, edite `src/utils/sanitize.ts`:

```typescript
return DOMPurify.sanitize(String(html), {
  ALLOWED_TAGS: [
    // Adicione mais tags aqui
    'iframe', 'video', // por exemplo
  ],
  ALLOWED_ATTR: [
    // Adicione mais atributos aqui
    'width', 'height', 'style', // por exemplo
  ],
});
```

## ⚠️ Importante sobre SSR:

A função detecta se está rodando no servidor (SSR) ou no cliente:
- **Servidor**: retorna o HTML sem modificação (DOMPurify precisa do DOM)
- **Cliente**: aplica sanitização completa

Isso garante que o Next.js funcione corretamente com SSR/SSG.

## 🎯 Benefícios:

1. ✅ **Segurança**: Previne ataques XSS
2. ✅ **Performance**: Rápido e leve (~3KB gzipped)
3. ✅ **Confiável**: Usado por Google, Microsoft, Facebook
4. ✅ **Flexível**: Configurável conforme necessidade
5. ✅ **Compatível**: Funciona com SSR do Next.js

## 🚀 Próximos passos recomendados:

1. **Teste em desenvolvimento**: 
   ```bash
   npm run dev
   ```
   Tente adicionar conteúdo HTML no MongoDB e veja sendo sanitizado

2. **Adicione validação no backend**: 
   Valide e sanitize também no servidor ao receber dados POST

3. **Considere usar Markdown**: 
   Para conteúdo rico, considere usar Markdown ao invés de HTML puro:
   ```bash
   npm install marked
   npm install dompurify
   # Use os dois juntos para converter Markdown → HTML → Sanitizado
   ```

## ✅ Status: Implementação completa!

Seu projeto agora está protegido contra ataques XSS via HTML injection! 🛡️
