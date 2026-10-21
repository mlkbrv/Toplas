import type { AppNotification } from './types';

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: 'nt-1',
    category: 'bookings',
    icon: 'ticket-outline',
    title: { en: 'Ticket confirmed', az: 'Bilet təsdiqləndi' },
    body: {
      en: 'Your spot for Baku Tech Summit is confirmed. See you there!',
      az: 'Bakı Texnologiya Sammiti üçün yerin təsdiqləndi. Orada görüşərik!',
    },
    time: '2026-10-18T09:10:00',
    read: false,
  },
  {
    id: 'nt-2',
    category: 'events',
    icon: 'calendar-outline',
    title: { en: 'Starting soon', az: 'Tezliklə başlayır' },
    body: {
      en: 'Sunrise Rooftop Yoga starts tomorrow at 07:00.',
      az: 'Gündoğuşu Damüstü Yoqa sabah 07:00-da başlayır.',
    },
    time: '2026-10-18T08:00:00',
    read: false,
  },
  {
    id: 'nt-3',
    category: 'messages',
    icon: 'chatbubble-ellipses-outline',
    title: { en: 'New message', az: 'Yeni mesaj' },
    body: { en: 'Kamran: See you at the hackathon kickoff!', az: 'Kamran: Hakaton açılışında görüşərik!' },
    time: '2026-10-18T10:24:00',
    read: false,
  },
  {
    id: 'nt-4',
    category: 'communities',
    icon: 'people-outline',
    title: { en: 'New announcement', az: 'Yeni elan' },
    body: {
      en: 'Baku Developers: Hackathon teams forming now.',
      az: 'Bakı Developerləri: Hakaton komandaları indi formalaşır.',
    },
    time: '2026-10-16T12:00:00',
    read: true,
  },
  {
    id: 'nt-5',
    category: 'opportunities',
    icon: 'briefcase-outline',
    title: { en: 'Deadline approaching', az: 'Son tarix yaxınlaşır' },
    body: {
      en: 'Applications for the autumn founder cohort close Friday.',
      az: 'Payız təsisçi qrupu üçün müraciətlər cümə günü bağlanır.',
    },
    time: '2026-10-15T10:00:00',
    read: true,
  },
  {
    id: 'nt-6',
    category: 'events',
    icon: 'sparkles-outline',
    title: { en: 'New event you might like', az: 'Bəyənə biləcəyin yeni tədbir' },
    body: {
      en: 'Caspian Pitch Night was added near you.',
      az: 'Yaxınlığında Xəzər Təqdimat Gecəsi əlavə olundu.',
    },
    time: '2026-10-14T16:30:00',
    read: true,
  },
  {
    id: 'nt-7',
    category: 'bookings',
    icon: 'hourglass-outline',
    title: { en: 'You’re on the waitlist', az: 'Növbədəsən' },
    body: {
      en: 'Sunrise Rooftop Yoga is full — we’ll notify you if a spot opens.',
      az: 'Gündoğuşu Damüstü Yoqa doludur — yer açılsa xəbər verəcəyik.',
    },
    time: '2026-10-13T19:00:00',
    read: true,
  },
  {
    id: 'nt-8',
    category: 'messages',
    icon: 'person-add-outline',
    title: { en: 'Connection request', az: 'Əlaqə sorğusu' },
    body: { en: 'Elvin wants to connect with you.', az: 'Elvin səninlə əlaqə qurmaq istəyir.' },
    time: '2026-10-16T14:30:00',
    read: true,
  },
];
