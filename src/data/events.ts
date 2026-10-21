import type { EventItem } from './types';
import { EVENTS_PART1 } from './events.part1';
import { EVENTS_PART2 } from './events.part2';
import { EVENTS_PAST } from './events.past';

/** Upcoming/discoverable events. */
export const EVENTS: EventItem[] = [...EVENTS_PART1, ...EVENTS_PART2];

/** Every event including past ones — used for lookups (bookings, reviews). */
export const ALL_EVENTS: EventItem[] = [...EVENTS, ...EVENTS_PAST];

export function getEvent(id: string): EventItem | undefined {
  return ALL_EVENTS.find((e) => e.id === id);
}

export function eventsByOrganizer(organizerId: string): EventItem[] {
  return EVENTS.filter((e) => e.organizerId === organizerId);
}

export const FEATURED_EVENT: EventItem = EVENTS.find((e) => e.featured) ?? EVENTS[0];
