export type Locale = 'en' | 'zh';

export const MESSAGES = {
  en: {
    language: 'Language',
    switchToDark: 'Switch to dark mode',
    switchToLight: 'Switch to light mode',
    introTitle: "I'm Simon Shen, a software developer in Auckland, New Zealand.",
    introLead: 'I work mostly with TypeScript and Azure, and this is where I keep the tools, ideas, apps and guides worth remembering.',
    filterEntries: 'Filter entries',
    filterByType: 'Filter by type',
    all: 'All',
    search: 'Search by title',
    clearFilters: 'Clear filters',
    noEntries: 'No entries match',
    tryDifferent: 'Try a different search or remove a filter.',
    entriesCount: (count: number) => `${count} ${count === 1 ? 'entry' : 'entries'}`,
    tags: 'Tags',
    allEntries: 'All entries',
    inThisGuide: 'In this guide',
    onThisPage: 'On this page',
    previous: 'Previous',
    next: 'Next',
    footerLocation: 'Auckland, New Zealand',
    contactFeedback: 'Feedback',
    footerHosting: 'Built with Astro · Hosted on GitHub Pages',
  },
  zh: {
    language: '语言',
    switchToDark: '切换到深色模式',
    switchToLight: '切换到浅色模式',
    introTitle: 'Simon Shen，常驻新西兰奥克兰的软件开发者。',
    introLead: '我主要使用 TypeScript 和 Azure，并在这里整理值得记住的工具、想法、应用和指南。',
    filterEntries: '筛选条目',
    filterByType: '按类型筛选',
    all: '全部',
    search: '按标题搜索',
    clearFilters: '清除筛选',
    noEntries: '没有匹配的条目',
    tryDifferent: '试试其他搜索词，或移除筛选条件。',
    entriesCount: (count: number) => `${count} 篇条目`,
    tags: '标签',
    allEntries: '全部条目',
    inThisGuide: '本指南目录',
    onThisPage: '本页目录',
    previous: '上一篇',
    next: '下一篇',
    footerLocation: '新西兰奥克兰',
    contactFeedback: '反馈',
    footerHosting: '使用 Astro 构建 · 托管于 GitHub Pages',
  },
} satisfies Record<Locale, Record<string, string | ((count: number) => string)>>;

export function typeLabel(type: 'Guide' | 'Tool' | 'App' | 'Idea', locale: Locale): string {
  if (locale === 'en') return type;
  return {
    Guide: '指南',
    Tool: '工具',
    App: '应用',
    Idea: '想法',
  }[type];
}

export function formatLocalizedDate(date: Date, locale: Locale): string {
  if (locale === 'en') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
  }
  return `${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月${date.getUTCDate()}日`;
}

export function homeUrl(locale: Locale): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return locale === 'zh' ? `${base}/zh/` : `${base}/`;
}