import type { Business } from './types';
import { cover, logo } from './images';

export const BUSINESSES: Business[] = [
  {
    id: 'bz-brew',
    name: 'Brew & Bloom',
    logo: logo('brew'),
    cover: cover('bz-brew', 1080, 500),
    description: {
      en: 'A specialty coffee house hosting board-game nights, tastings, and open-mic evenings.',
      az: 'Stolüstü oyun gecələri, dequstasiyalar və açıq mikrofon axşamları keçirən ixtisaslaşmış qəhvəxana.',
    },
    category: 'food',
    address: 'Nizami St 88, Baku',
    hours: { en: 'Mon–Sun · 08:00–23:00', az: 'B.e–B. · 08:00–23:00' },
    followers: 2310,
    following: false,
    verified: true,
    rating: 4.8,
    reviewCount: 412,
    upcomingEventIds: ['ev-book-club'],
    rewards: [
      {
        id: 'rw-1',
        title: { en: 'Free filter coffee', az: 'Pulsuz filtr qəhvə' },
        detail: {
          en: 'Get a free filter coffee after attending 3 eligible events.',
          az: '3 uyğun tədbirə qatıldıqdan sonra pulsuz filtr qəhvə qazan.',
        },
        eligibility: {
          en: 'Attend any 3 Toplaş events this month.',
          az: 'Bu ay istənilən 3 Toplaş tədbirinə qatıl.',
        },
        expires: '2026-11-30',
        terms: {
          en: 'One per customer. Dine-in only. Cannot be combined with other offers.',
          az: 'Müştəri başına bir dənə. Yalnız yerində. Digər təkliflərlə birləşdirilə bilməz.',
        },
        code: 'BREW-3EVENTS',
        points: 30,
      },
      {
        id: 'rw-2',
        title: { en: '15% off pastries', az: 'Şirniyyatlara 15% endirim' },
        detail: {
          en: 'Members get 15% off all pastries, every day.',
          az: 'Üzvlər hər gün bütün şirniyyatlara 15% endirim əldə edir.',
        },
        eligibility: { en: 'Follow Brew & Bloom on Toplaş.', az: 'Toplaş-da Brew & Bloom-u izlə.' },
        expires: '2026-12-31',
        terms: { en: 'Show this code at checkout.', az: 'Bu kodu kassada göstər.' },
        code: 'BLOOM-15',
      },
    ],
  },
  {
    id: 'bz-pulse',
    name: 'Pulse Studio',
    logo: logo('pulse'),
    cover: cover('bz-pulse', 1080, 500),
    description: {
      en: 'Boutique fitness and wellness studio with group classes and open community sessions.',
      az: 'Qrup məşğələləri və açıq icma sessiyaları olan butik fitnes və sağlamlıq studiyası.',
    },
    category: 'wellness',
    address: 'Port Baku, Baku',
    hours: { en: 'Mon–Sat · 06:00–22:00', az: 'B.e–Ş. · 06:00–22:00' },
    followers: 4360,
    following: true,
    verified: true,
    rating: 4.7,
    reviewCount: 298,
    upcomingEventIds: ['ev-yoga', 'ev-5aside'],
    rewards: [
      {
        id: 'rw-3',
        title: { en: 'First class free', az: 'İlk məşğələ pulsuz' },
        detail: {
          en: 'New members get their first group class on us.',
          az: 'Yeni üzvlər ilk qrup məşğələsini bizdən hədiyyə alır.',
        },
        eligibility: { en: 'New Pulse members only.', az: 'Yalnız yeni Pulse üzvləri.' },
        expires: '2026-12-15',
        terms: { en: 'Valid once. ID required.', az: 'Bir dəfə etibarlıdır. Şəxsiyyət vəsiqəsi tələb olunur.' },
        code: 'PULSE-FIRST',
        points: 20,
      },
    ],
  },
  {
    id: 'bz-jazz',
    name: 'Old City Jazz',
    logo: logo('jazz'),
    cover: cover('bz-jazz', 1080, 500),
    description: {
      en: 'Historic venue for live jazz nights, jam sessions, and private events.',
      az: 'Canlı caz gecələri, jam sessiyaları və özəl tədbirlər üçün tarixi məkan.',
    },
    category: 'music',
    address: 'Icherisheher, Baku',
    hours: { en: 'Wed–Sun · 19:00–01:00', az: 'Ç.a–B. · 19:00–01:00' },
    followers: 6680,
    following: false,
    verified: true,
    rating: 4.8,
    reviewCount: 356,
    upcomingEventIds: ['ev-jazz'],
    rewards: [
      {
        id: 'rw-4',
        title: { en: 'Loyalty: 5th ticket free', az: 'Sadiqlik: 5-ci bilet pulsuz' },
        detail: {
          en: 'Collect 4 jazz-night stamps, get the 5th ticket free.',
          az: '4 caz gecəsi möhürü topla, 5-ci bileti pulsuz al.',
        },
        eligibility: { en: 'Attend 4 jazz nights.', az: '4 caz gecəsinə qatıl.' },
        expires: '2027-03-31',
        terms: { en: 'Stamps tracked in-app. Non-transferable.', az: 'Möhürlər tətbiqdə izlənir. Başqasına verilə bilməz.' },
        code: 'JAZZ-LOYAL5',
        points: 50,
      },
    ],
  },
];

export function getBusiness(id: string): Business | undefined {
  return BUSINESSES.find((b) => b.id === id);
}
