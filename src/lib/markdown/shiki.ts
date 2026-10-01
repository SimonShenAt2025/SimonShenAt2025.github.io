import type { ShikiTransformer } from 'shiki';

const SHELLS = new Set(['bash', 'sh', 'shell', 'zsh', 'powershell', 'ps1', 'pwsh']);
const FOREGROUND = 'var(--astro-code-foreground)';
const OPERATOR = /^[\s=+\-*/%<>!&|^~:.,]+$/;

/**
 * Brings Shiki's css-variables output in line with the design's highlighting:
 * only quoted strings are strings (shell arguments stay plain), and operators
 * such as `=` stay in the base colour rather than the keyword colour.
 */
export const designTokens: ShikiTransformer = {
  name: 'site-design-tokens',
  tokens(lines) {
    const shell = SHELLS.has(this.options.lang);
    for (const line of lines) {
      for (const token of line) {
        const color = token.color ?? '';
        if (shell && color.includes('token-string') && !/^\s*["']/.test(token.content)) token.color = FOREGROUND;
        if (color.includes('token-keyword') && OPERATOR.test(token.content)) token.color = FOREGROUND;
      }
    }
    return lines;
  },
};
