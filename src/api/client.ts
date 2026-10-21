import { API_URL, API_TIMEOUT } from './config';
import type {
  Booking,
  Community,
  EventItem,
  AppNotification,
  Business,
  Mentor,
  Opportunity,
} from '../data/types';

type Envelope<T> = { ok: boolean; data: T; error?: string };

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT);
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as Envelope<T>;
    if (!json.ok) throw new Error(json.error ?? 'Request failed');
    return json.data;
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  health: () => apiFetch<{ status: string; events: number }>('/api/health'),
  events: () => apiFetch<EventItem[]>('/api/events'),
  event: (id: string) => apiFetch<EventItem>(`/api/events/${id}`),
  communities: () => apiFetch<Community[]>('/api/communities'),
  opportunities: () => apiFetch<Opportunity[]>('/api/opportunities'),
  mentors: () => apiFetch<Mentor[]>('/api/mentors'),
  businesses: () => apiFetch<Business[]>('/api/businesses'),
  notifications: () => apiFetch<AppNotification[]>('/api/notifications'),
  bookings: () => apiFetch<Booking[]>('/api/bookings'),

  // Mutations — fire-and-forget from the UI; failures fall back silently.
  createBooking: (eventId: string) =>
    apiFetch<Booking>('/api/bookings', { method: 'POST', body: JSON.stringify({ eventId }) }),
  toggleSave: (eventId: string) =>
    apiFetch<{ saved: boolean }>(`/api/events/${eventId}/save`, { method: 'POST' }),
  toggleJoin: (communityId: string) =>
    apiFetch<{ joined: boolean }>(`/api/communities/${communityId}/join`, { method: 'POST' }),
};
