/**
 * Sätteri hast plugins that turn plain Markdown output into the design's prose
 * components. Astro runs them after Shiki and before its own image/heading passes,
 * so `<pre>` is already highlighted and `<img>` is still optimised afterwards.
 */
import { defineHastPlugin, type HastNode } from 'satteri';
import type { Element, ElementContent, Properties } from 'hast';
import { icons } from '../icons';

/** Materialised nodes belong to the tree being edited; content handed back must be plain copies. */
const clone = <T>(node: T): T => JSON.parse(JSON.stringify(node, (k, v) => (k === 'position' ? undefined : v)));

const h = (tagName: string, properties: Properties = {}, children: ElementContent[] = []): Element => ({
  type: 'element',
  tagName,
  properties,
  children,
});

const text = (value: string): ElementContent => ({ type: 'text', value });

const icon = (d: string, size: number): Element =>
  h('svg', { width: String(size), height: String(size), viewBox: '0 0 24 24', ariaHidden: 'true' }, [
    h('path', { fill: 'currentColor', d }),
  ]);

const isBlank = (n: HastNode | ElementContent) => n.type === 'text' && !n.value.trim();

/* ---------- Callouts: GitHub alert syntax → Stridyn Alert ---------- */

const ALERTS: Record<string, { status: string; title: string }> = {
  NOTE: { status: 'info', title: 'Note' },
  TIP: { status: 'info', title: 'Tip' },
  IMPORTANT: { status: 'info', title: 'Important' },
  WARNING: { status: 'warning', title: 'Warning' },
  CAUTION: { status: 'error', title: 'Caution' },
};
const ALERT_MARKER = /^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][ \t]*\n?/i;

export const callouts = defineHastPlugin({
  name: 'site-callouts',
  element: {
    filter: ['blockquote'],
    visit(node, ctx) {
      const blocks = node.children.filter((c) => !isBlank(c)).map(clone);
      const first = blocks[0];
      if (first?.type !== 'element' || first.tagName !== 'p') return;
      const lead = first.children[0];
      if (lead?.type !== 'text') return;
      const match = lead.value.match(ALERT_MARKER);
      if (!match) return;

      const alert = ALERTS[match[1].toUpperCase()];
      lead.value = lead.value.slice(match[0].length);
      if (!lead.value) first.children.shift();
      if (!first.children.length) blocks.shift();

      ctx.replaceNode(
        node,
        h('div', { className: ['ds-alert', alert.status], role: 'note' }, [
          h('span', { className: ['ds-alert-icon'], ariaHidden: 'true' }),
          h('div', { className: ['ds-alert-main'] }, [
            h('div', { className: ['ds-alert-body'] }, [
              h('div', { className: ['ds-alert-title'] }, [text(alert.title)]),
              h('div', { className: ['ds-alert-desc'] }, blocks as ElementContent[]),
            ]),
          ]),
        ]),
      );
    },
  },
});

/* ---------- Figures: a paragraph holding only an image → figure + lightbox trigger ---------- */

export const figures = defineHastPlugin({
  name: 'site-figures',
  element: {
    filter: ['p'],
    visit(node, ctx) {
      const content = node.children.filter((c) => !isBlank(c));
      const img = content[0];
      if (content.length !== 1 || img.type !== 'element' || img.tagName !== 'img') return;

      const { title, ...imgProps } = clone(img.properties ?? {});
      const alt = String(imgProps.alt ?? '');
      const caption = typeof title === 'string' ? title : '';

      ctx.replaceNode(
        node,
        h('figure', { className: ['figure'] }, [
          h('button', { type: 'button', className: ['figure-zoom'], ariaLabel: `Enlarge screenshot: ${alt}` }, [
            h('img', { ...imgProps, loading: 'lazy', decoding: 'async' }),
            h('span', { className: ['figure-badge'], ariaHidden: 'true' }, [icon(icons.zoomIn, 18)]),
          ]),
          ...(caption ? [h('figcaption', {}, [text(caption)])] : []),
        ]),
      );
    },
  },
});

/* ---------- External links: new tab + icon + screen-reader hint ---------- */

export const externalLinks = defineHastPlugin({
  name: 'site-external-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      const href = node.properties?.href;
      if (typeof href !== 'string' || !/^https?:\/\//i.test(href)) return;

      ctx.setProperty(node, 'target', '_blank');
      ctx.setProperty(node, 'rel', 'noopener');
      ctx.setProperty(node, 'className', ['ext-link']);
      ctx.appendChild(node, [
        icon(icons.openInNew, 14),
        h('span', { className: ['visually-hidden'] }, [text('(opens in a new tab)')]),
      ]);
    },
  },
});

/* ---------- Code blocks: Shiki <pre> → header bar with language label and copy button ---------- */

export const codeBlocks = defineHastPlugin({
  name: 'site-code-blocks',
  element: {
    filter: ['pre'],
    visit(node, ctx) {
      const parent = ctx.parent(node);
      if (parent.type === 'element' && parent.properties?.className?.toString().includes('code-block')) return;

      const raw = node.properties?.dataLanguage;
      const lang = typeof raw === 'string' && raw !== 'plaintext' ? raw.toLowerCase() : 'text';

      ctx.replaceNode(
        node,
        h('div', { className: ['code-block'], dataLanguage: lang }, [
          h('div', { className: ['code-head'] }, [
            h('span', { className: ['code-lang'] }, [text(lang)]),
            h('button', { type: 'button', className: ['code-copy'], ariaLabel: `Copy ${lang} code` }, [
              icon(icons.copy, 14),
              h('span', { className: ['code-copy-label'], ariaLive: 'polite' }, [text('Copy')]),
            ]),
          ]),
          clone(node) as Element,
        ]),
      );
    },
  },
});

export const siteHastPlugins = [callouts, figures, externalLinks, codeBlocks];
