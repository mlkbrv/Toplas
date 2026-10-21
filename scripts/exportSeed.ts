/**
 * Exports the app's mock data to server/seed.json so the backend serves the
 * exact same shapes the app expects (no data duplication). Run:
 *   npx --yes tsx scripts/exportSeed.ts
 */
import * as fs from 'fs';
import * as path from 'path';
import { EVENTS, ALL_EVENTS } from '../src/data/events';
import { COMMUNITIES } from '../src/data/communities';
import { ORGANIZERS } from '../src/data/organizers';
import { SPEAKERS } from '../src/data/speakers';
import { MENTORS, OPPORTUNITIES } from '../src/data/opportunities';
import { BUSINESSES } from '../src/data/businesses';
import { NOTIFICATIONS } from '../src/data/notifications';
import { CONVERSATIONS } from '../src/data/conversations';
import { CURRENT_USER, ATTENDEES } from '../src/data/users';
import { BOOKINGS, REVIEWS } from '../src/data/bookings';

const seed = {
  user: CURRENT_USER,
  attendees: ATTENDEES,
  events: EVENTS,
  allEvents: ALL_EVENTS,
  communities: COMMUNITIES,
  organizers: ORGANIZERS,
  speakers: SPEAKERS,
  mentors: MENTORS,
  opportunities: OPPORTUNITIES,
  businesses: BUSINESSES,
  notifications: NOTIFICATIONS,
  conversations: CONVERSATIONS,
  bookings: BOOKINGS,
  reviews: REVIEWS,
};

const out = path.join(__dirname, '..', 'server', 'seed.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(seed, null, 2), 'utf8');
console.log(`Wrote ${out} (${EVENTS.length} events, ${COMMUNITIES.length} communities)`);
