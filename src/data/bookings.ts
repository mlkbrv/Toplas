import type { Booking, Review } from './types';

/** Current user's bookings. Status drives the My Events tabs. */
export const BOOKINGS: Booking[] = [
  {
    id: 'bk-1',
    eventId: 'ev-tech-summit',
    status: 'confirmed',
    ticketType: { en: 'General Admission', az: 'Ümumi Giriş' },
    price: 15,
    qr: 'TOPLAS-TECH-7F3A9',
    purchasedAt: '2026-10-12T14:00:00',
  },
  {
    id: 'bk-2',
    eventId: 'ev-startup-pitch',
    status: 'confirmed',
    ticketType: { en: 'Free RSVP', az: 'Pulsuz RSVP' },
    price: 0,
    qr: 'TOPLAS-PITCH-2B8C1',
    purchasedAt: '2026-10-13T09:30:00',
  },
  {
    id: 'bk-3',
    eventId: 'ev-jazz',
    status: 'pending',
    ticketType: { en: 'Standard', az: 'Standart' },
    price: 20,
    qr: 'TOPLAS-JAZZ-5D1E7',
    purchasedAt: '2026-10-17T20:15:00',
  },
  {
    id: 'bk-4',
    eventId: 'ev-yoga',
    status: 'waitlisted',
    ticketType: { en: 'Drop-in', az: 'Birdəfəlik' },
    price: 10,
    qr: 'TOPLAS-YOGA-9A4F2',
    purchasedAt: '2026-10-13T19:00:00',
  },
  {
    id: 'bk-5',
    eventId: 'ev-past-ux-talk',
    status: 'attended',
    ticketType: { en: 'General Admission', az: 'Ümumi Giriş' },
    price: 10,
    qr: 'TOPLAS-UX-3C6B8',
    purchasedAt: '2026-09-10T11:00:00',
  },
  {
    id: 'bk-6',
    eventId: 'ev-past-charity-run',
    status: 'attended',
    ticketType: { en: '5K Entry', az: '5K Qeydiyyatı' },
    price: 5,
    qr: 'TOPLAS-RUN-1E9D4',
    purchasedAt: '2026-09-20T08:00:00',
  },
];

/** Current user's reviews. */
export const REVIEWS: Review[] = [
  {
    id: 'rv-1',
    eventTitle: { en: 'Designing for Trust', az: 'Etibar üçün Dizayn' },
    rating: 5,
    text: {
      en: 'Thoughtful talk, great discussion afterward. Left with real takeaways.',
      az: 'Düşündürücü çıxış, sonrasında əla müzakirə. Real nəticələrlə ayrıldım.',
    },
    date: '2026-09-19T08:00:00',
  },
  {
    id: 'rv-2',
    eventTitle: { en: 'Autumn Charity Run', az: 'Payız Xeyriyyə Qaçışı' },
    rating: 5,
    text: {
      en: 'Beautiful morning, well organized, and for a good cause.',
      az: 'Gözəl səhər, yaxşı təşkil olunub və xeyirxah məqsəd üçün.',
    },
    date: '2026-09-28T12:00:00',
  },
];
