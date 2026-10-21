import type { CategoryKey } from './types';

export type CategoryMeta = {
  key: CategoryKey;
  /** Ionicons (outline) glyph name. */
  icon: string;
  /** Accent color — stays within the violet/magenta/cyan family. */
  color: string;
};

export const CATEGORY_META: Record<CategoryKey, CategoryMeta> = {
  technology: { key: 'technology', icon: 'hardware-chip-outline', color: '#8B5CF6' },
  networking: { key: 'networking', icon: 'people-outline', color: '#A78BFA' },
  music: { key: 'music', icon: 'musical-notes-outline', color: '#E879F9' },
  education: { key: 'education', icon: 'school-outline', color: '#C084FC' },
  sports: { key: 'sports', icon: 'basketball-outline', color: '#22D3EE' },
  startups: { key: 'startups', icon: 'rocket-outline', color: '#A855F7' },
  art: { key: 'art', icon: 'color-palette-outline', color: '#F472B6' },
  volunteering: { key: 'volunteering', icon: 'heart-outline', color: '#34D399' },
  languageExchange: { key: 'languageExchange', icon: 'chatbubbles-outline', color: '#60A5FA' },
  wellness: { key: 'wellness', icon: 'leaf-outline', color: '#34D399' },
  business: { key: 'business', icon: 'briefcase-outline', color: '#A78BFA' },
  books: { key: 'books', icon: 'book-outline', color: '#C084FC' },
  food: { key: 'food', icon: 'restaurant-outline', color: '#FBBF24' },
  entrepreneurship: { key: 'entrepreneurship', icon: 'bulb-outline', color: '#E879F9' },
  personalDev: { key: 'personalDev', icon: 'trending-up-outline', color: '#8B5CF6' },
  studentClubs: { key: 'studentClubs', icon: 'library-outline', color: '#60A5FA' },
  peerSupport: { key: 'peerSupport', icon: 'hand-left-outline', color: '#2DD4BF' },
};

/** Ordered keys used for the Discover category chips. */
export const DISCOVER_CATEGORY_KEYS: CategoryKey[] = [
  'technology',
  'networking',
  'music',
  'education',
  'sports',
  'startups',
  'art',
  'volunteering',
];

/** Full ordered list used in Explore filters & Communities. */
export const ALL_CATEGORY_KEYS: CategoryKey[] = [
  'technology',
  'networking',
  'startups',
  'education',
  'entrepreneurship',
  'music',
  'art',
  'sports',
  'wellness',
  'business',
  'languageExchange',
  'books',
  'food',
  'volunteering',
  'personalDev',
  'studentClubs',
  'peerSupport',
];
