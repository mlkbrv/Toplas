import type { Conversation } from './types';
import { avatar } from './images';

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'cv-1',
    kind: 'dm',
    title: 'Kamran Əliyev',
    avatar: avatar(3),
    lastMessage: {
      en: 'See you at the hackathon kickoff!',
      az: 'Hakaton açılışında görüşərik!',
    },
    timestamp: '2026-10-18T10:24:00',
    unread: 2,
    messages: [
      {
        id: 'm1',
        fromMe: false,
        text: { en: 'Hey! Are you going to the hackathon?', az: 'Salam! Hakatona gedirsən?' },
        time: '10:20',
      },
      {
        id: 'm2',
        fromMe: true,
        text: { en: 'Yes! Already registered.', az: 'Bəli! Artıq qeydiyyatdan keçdim.' },
        time: '10:22',
      },
      {
        id: 'm3',
        fromMe: false,
        text: { en: 'See you at the hackathon kickoff!', az: 'Hakaton açılışında görüşərik!' },
        time: '10:24',
      },
    ],
  },
  {
    id: 'cv-2',
    kind: 'event',
    title: { en: 'Baku Tech Summit', az: 'Bakı Texnologiya Sammiti' },
    avatar: avatar(11),
    lastMessage: {
      en: 'Organizer: Doors open at 18:30 sharp.',
      az: 'Təşkilatçı: Qapılar dəqiq 18:30-da açılır.',
    },
    timestamp: '2026-10-18T09:00:00',
    unread: 1,
    eventId: 'ev-tech-summit',
    isOrganizerAnnouncement: true,
    messages: [
      {
        id: 'm4',
        fromMe: false,
        author: 'Baku Tech Collective',
        text: {
          en: 'Welcome everyone! Doors open at 18:30 sharp. Bring your ticket QR.',
          az: 'Hamıya xoş gəldiniz! Qapılar dəqiq 18:30-da açılır. Bilet QR-ınızı gətirin.',
        },
        time: '09:00',
      },
      {
        id: 'm5',
        fromMe: false,
        author: 'Səbinə',
        text: { en: 'Can’t wait 🙌', az: 'Səbirsizliklə gözləyirəm 🙌' },
        time: '09:05',
      },
    ],
  },
  {
    id: 'cv-3',
    kind: 'event',
    title: { en: 'Polyglot Night', az: 'Poliqlot Gecəsi' },
    avatar: avatar(9),
    lastMessage: { en: 'Günel: I’ll bring the card games!', az: 'Günel: Kart oyunlarını mən gətirərəm!' },
    timestamp: '2026-10-17T21:12:00',
    unread: 0,
    eventId: 'ev-lang-exchange',
    messages: [
      {
        id: 'm6',
        fromMe: false,
        author: 'Günel',
        text: { en: 'I’ll bring the card games!', az: 'Kart oyunlarını mən gətirərəm!' },
        time: '21:12',
      },
    ],
  },
  {
    id: 'cv-4',
    kind: 'request',
    title: 'Elvin Nəbiyev',
    avatar: avatar(52),
    lastMessage: {
      en: 'Hi, we met at the founders mixer — connect?',
      az: 'Salam, təsisçilər görüşündə tanış olduq — əlaqə quraq?',
    },
    timestamp: '2026-10-16T14:30:00',
    unread: 1,
    messages: [
      {
        id: 'm7',
        fromMe: false,
        text: {
          en: 'Hi, we met at the founders mixer — connect?',
          az: 'Salam, təsisçilər görüşündə tanış olduq — əlaqə quraq?',
        },
        time: '14:30',
      },
    ],
  },
  {
    id: 'cv-5',
    kind: 'request',
    title: 'Lamiyə Quliyeva',
    avatar: avatar(41),
    lastMessage: {
      en: 'Loved your talk notes — would love to chat.',
      az: 'Çıxış qeydlərin çox xoşuma gəldi — söhbət etmək istərdim.',
    },
    timestamp: '2026-10-15T11:05:00',
    unread: 0,
    messages: [
      {
        id: 'm8',
        fromMe: false,
        text: {
          en: 'Loved your talk notes — would love to chat.',
          az: 'Çıxış qeydlərin çox xoşuma gəldi — söhbət etmək istərdim.',
        },
        time: '11:05',
      },
    ],
  },
];

export function getConversation(id: string): Conversation | undefined {
  return CONVERSATIONS.find((c) => c.id === id);
}
