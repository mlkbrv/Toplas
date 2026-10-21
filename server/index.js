/**
 * Toplaş MVP backend.
 * Express + in-memory store, seeded from server/seed.json (generated from the
 * app's own mock data via scripts/exportSeed.ts, so shapes match exactly).
 *
 * Not production: no database, auth is a demo token, state resets on restart.
 */
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import cors from 'cors';

const __dirname = dirname(fileURLToPath(import.meta.url));
const seed = JSON.parse(fs.readFileSync(join(__dirname, 'seed.json'), 'utf8'));

// ---- In-memory state (single demo user) --------------------------------
const state = {
  user: seed.user,
  savedEventIds: ['ev-jazz', 'ev-hackathon'],
  registeredEventIds: seed.bookings
    .filter((b) => b.status === 'confirmed' || b.status === 'pending')
    .map((b) => b.eventId),
  waitlistedEventIds: seed.bookings.filter((b) => b.status === 'waitlisted').map((b) => b.eventId),
  joinedCommunityIds: seed.communities.filter((c) => c.joined).map((c) => c.id),
  bookings: [...seed.bookings],
};

const app = express();
app.use(cors());
app.use(express.json());

const ok = (res, data) => res.json({ ok: true, data });
const notFound = (res) => res.status(404).json({ ok: false, error: 'Not found' });

// ---- Health ------------------------------------------------------------
app.get('/api/health', (_req, res) => ok(res, { status: 'up', events: seed.events.length }));

// ---- Auth (demo) -------------------------------------------------------
app.post('/api/auth/login', (req, res) => {
  const email = (req.body && req.body.email) || 'demo@toplas.app';
  ok(res, { token: 'demo-token', user: { ...state.user, email } });
});
app.get('/api/me', (_req, res) => ok(res, state.user));

// ---- Catalog (read) ----------------------------------------------------
app.get('/api/events', (req, res) => {
  const { category, format, q } = req.query;
  let list = seed.events;
  if (category) list = list.filter((e) => e.category === category);
  if (format) list = list.filter((e) => e.format === format);
  if (q) {
    const needle = String(q).toLowerCase();
    list = list.filter(
      (e) =>
        e.title.en.toLowerCase().includes(needle) ||
        e.title.az.toLowerCase().includes(needle) ||
        e.tags.some((t) => t.toLowerCase().includes(needle))
    );
  }
  ok(res, list);
});
app.get('/api/events/:id', (req, res) => {
  const ev = seed.allEvents.find((e) => e.id === req.params.id);
  return ev ? ok(res, ev) : notFound(res);
});
app.get('/api/communities', (_req, res) => ok(res, seed.communities));
app.get('/api/communities/:id', (req, res) => {
  const c = seed.communities.find((x) => x.id === req.params.id);
  return c ? ok(res, c) : notFound(res);
});
app.get('/api/organizers/:id', (req, res) => {
  const o = seed.organizers.find((x) => x.id === req.params.id);
  return o ? ok(res, o) : notFound(res);
});
app.get('/api/opportunities', (_req, res) => ok(res, seed.opportunities));
app.get('/api/mentors', (_req, res) => ok(res, seed.mentors));
app.get('/api/businesses', (_req, res) => ok(res, seed.businesses));
app.get('/api/businesses/:id', (req, res) => {
  const b = seed.businesses.find((x) => x.id === req.params.id);
  return b ? ok(res, b) : notFound(res);
});
app.get('/api/notifications', (_req, res) => ok(res, seed.notifications));
app.get('/api/conversations', (_req, res) => ok(res, seed.conversations));

// ---- User state (read/write) ------------------------------------------
app.get('/api/me/state', (_req, res) =>
  ok(res, {
    savedEventIds: state.savedEventIds,
    registeredEventIds: state.registeredEventIds,
    waitlistedEventIds: state.waitlistedEventIds,
    joinedCommunityIds: state.joinedCommunityIds,
  })
);

app.get('/api/bookings', (_req, res) => ok(res, state.bookings));

app.post('/api/bookings', (req, res) => {
  const eventId = req.body && req.body.eventId;
  const ev = seed.allEvents.find((e) => e.id === eventId);
  if (!ev) return notFound(res);
  const waitlist = ev.seatsLeft <= 0;
  const booking = {
    id: `bk-${Date.now()}`,
    eventId,
    status: waitlist ? 'waitlisted' : ev.priceFrom > 0 ? 'pending' : 'confirmed',
    ticketType: { en: 'General Admission', az: 'Ümumi Giriş' },
    price: ev.priceFrom,
    qr: `TOPLAS-${eventId}`,
    purchasedAt: new Date().toISOString(),
  };
  state.bookings.push(booking);
  if (waitlist) {
    if (!state.waitlistedEventIds.includes(eventId)) state.waitlistedEventIds.push(eventId);
  } else if (!state.registeredEventIds.includes(eventId)) {
    state.registeredEventIds.push(eventId);
  }
  ok(res, booking);
});

app.post('/api/events/:id/save', (req, res) => {
  const id = req.params.id;
  const i = state.savedEventIds.indexOf(id);
  if (i >= 0) state.savedEventIds.splice(i, 1);
  else state.savedEventIds.push(id);
  ok(res, { saved: i < 0, savedEventIds: state.savedEventIds });
});

app.post('/api/communities/:id/join', (req, res) => {
  const id = req.params.id;
  const i = state.joinedCommunityIds.indexOf(id);
  if (i >= 0) state.joinedCommunityIds.splice(i, 1);
  else state.joinedCommunityIds.push(id);
  ok(res, { joined: i < 0, joinedCommunityIds: state.joinedCommunityIds });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.warn(`Toplaş backend running on http://localhost:${PORT}`);
  console.warn(`  ${seed.events.length} events · ${seed.communities.length} communities`);
});
