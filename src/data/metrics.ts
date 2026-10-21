import type { MetricPoint } from './types';

/**
 * Organizer dashboard metrics. All values are sample/demo data — clearly
 * labeled in the UI and never presented as real performance.
 */

export const DASHBOARD_SUMMARY = {
  totalEvents: 12,
  upcomingEvents: 4,
  registrations: 1840,
  revenue: 9230, // AZN
  attendanceRate: 0.82,
  pageViews: 14560,
  conversion: 0.126,
};

/** Registrations over the last 7 days. */
export const REGISTRATIONS_SERIES: MetricPoint[] = [
  { label: 'Mon', value: 42 },
  { label: 'Tue', value: 61 },
  { label: 'Wed', value: 55 },
  { label: 'Thu', value: 78 },
  { label: 'Fri', value: 96 },
  { label: 'Sat', value: 120 },
  { label: 'Sun', value: 88 },
];

/** Page views over the last 7 days. */
export const VIEWS_SERIES: MetricPoint[] = [
  { label: 'Mon', value: 420 },
  { label: 'Tue', value: 510 },
  { label: 'Wed', value: 480 },
  { label: 'Thu', value: 640 },
  { label: 'Fri', value: 720 },
  { label: 'Sat', value: 910 },
  { label: 'Sun', value: 660 },
];

export type OrganizerEventRow = {
  eventId: string;
  registered: number;
  capacity: number;
  checkedIn: number;
};

/** Per-event management rows (reference events the current organizer owns). */
export const ORGANIZER_EVENT_ROWS: OrganizerEventRow[] = [
  { eventId: 'ev-tech-summit', registered: 552, capacity: 600, checkedIn: 0 },
  { eventId: 'ev-ai-workshop', registered: 43, capacity: 100, checkedIn: 0 },
  { eventId: 'ev-past-ux-talk', registered: 58, capacity: 60, checkedIn: 54 },
];
