import type { CategoryKey, EventItem } from '../../data/types';

export type ExploreFilters = {
  date: 'any' | 'today' | 'tomorrow' | 'weekend';
  distance: 'any' | '5' | '10' | '25';
  categories: CategoryKey[];
  price: 'any' | 'free' | 'paid';
  format: 'any' | 'in_person' | 'online';
  seatsOnly: boolean;
};

export type SortKey = 'recommended' | 'soonest' | 'nearest' | 'price';

export const DEFAULT_FILTERS: ExploreFilters = {
  date: 'any',
  distance: 'any',
  categories: [],
  price: 'any',
  format: 'any',
  seatsOnly: false,
};

export function countActive(f: ExploreFilters): number {
  let n = 0;
  if (f.date !== 'any') n++;
  if (f.distance !== 'any') n++;
  if (f.price !== 'any') n++;
  if (f.format !== 'any') n++;
  if (f.seatsOnly) n++;
  n += f.categories.length;
  return n;
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function applyFilters(events: EventItem[], f: ExploreFilters): EventItem[] {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  return events.filter((e) => {
    const start = new Date(e.start);

    if (f.date === 'today' && !sameDay(start, now)) return false;
    if (f.date === 'tomorrow' && !sameDay(start, tomorrow)) return false;
    if (f.date === 'weekend') {
      const day = start.getDay();
      if (day !== 0 && day !== 6) return false;
    }

    if (f.distance !== 'any' && e.format !== 'online') {
      if (e.distanceKm > Number(f.distance)) return false;
    }

    if (f.price === 'free' && e.priceFrom > 0) return false;
    if (f.price === 'paid' && e.priceFrom === 0) return false;

    if (f.format === 'in_person' && e.format === 'online') return false;
    if (f.format === 'online' && e.format !== 'online') return false;

    if (f.categories.length > 0 && !f.categories.includes(e.category)) return false;

    if (f.seatsOnly && e.seatsLeft <= 0) return false;

    return true;
  });
}

export function sortEvents(events: EventItem[], key: SortKey): EventItem[] {
  const copy = [...events];
  switch (key) {
    case 'soonest':
      return copy.sort((a, b) => +new Date(a.start) - +new Date(b.start));
    case 'nearest':
      return copy.sort((a, b) => a.distanceKm - b.distanceKm);
    case 'price':
      return copy.sort((a, b) => a.priceFrom - b.priceFrom);
    default:
      return copy;
  }
}
