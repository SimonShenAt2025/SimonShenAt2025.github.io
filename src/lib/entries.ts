import { getCollection, type CollectionEntry } from 'astro:content';
import { icons } from './icons';
import type { Locale } from './i18n';

export type Entry = CollectionEntry<'entries'>;
export type EntryType = Entry['data']['type'];

/** Per-type colour (dots, icons only — not AA for text), tint and icon path. */
export const TYPE_META: Record<EntryType, { main: string; tint: string; icon: string }> = {
  Guide: { main: 'var(--color-info-main)', tint: 'var(--site-tint-guide)', icon: icons.guide },
  Tool: { main: 'var(--color-success-main)', tint: 'var(--site-tint-tool)', icon: icons.tool },
  App: { main: 'var(--site-type-app)', tint: 'var(--site-tint-app)', icon: icons.app },
  Idea: { main: 'var(--color-warning-main)', tint: 'var(--site-tint-idea)', icon: icons.idea },
};

/** All entries, newest first. */
export async function getSortedEntries(locale: Locale = 'en'): Promise<Entry[]> {
  const all = await getCollection('entries');
  return all
    .filter((entry) => entry.data.language === locale)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function entryUrl(entry: Entry): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (entry.data.language === 'zh') {
    return `${base}/zh/entries/${entry.data.translationKey}/`;
  }
  return `${base}/entries/${entry.id}/`;
}

/** `2026-09-10`, for `<time datetime>`. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
