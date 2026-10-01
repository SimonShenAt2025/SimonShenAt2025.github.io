// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { siteHastPlugins } from './src/lib/markdown/plugins.ts';
import { designTokens } from './src/lib/markdown/shiki.ts';

// Repo name is SimonShenAt2025.github.io, so the site lives at the root URL
// and no `base` is needed.
export default defineConfig({
  site: 'https://simonshenat2025.github.io',
  markdown: {
    // Token colours come from CSS variables, mapped to --site-code-* in Prose.astro.
    shikiConfig: { theme: 'css-variables', transformers: [designTokens] },
    processor: satteri({
      hastPlugins: siteHastPlugins,
      // Keep `--flag` literal in prose and alt text; curly quotes and ellipses stay on.
      features: { smartPunctuation: { dashes: false } },
    }),
  },
});
