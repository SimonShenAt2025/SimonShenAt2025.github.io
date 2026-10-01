import { getCollection, type CollectionEntry } from 'astro:content';
import { icons } from './icons';

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
export async function getSortedEntries(): Promise<Entry[]> {
  const all = await getCollection('entries');
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function entryUrl(entry: Entry): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/entries/${entry.id}/`;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** `10 Sep 2026`. Built by hand because ICU's en-NZ short month for September is "Sept". */
export function formatDate(date: Date): string {
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

/** `2026-09-10`, for `<time datetime>`. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
