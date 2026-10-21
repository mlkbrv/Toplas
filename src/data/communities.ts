import type { Community } from './types';
import { avatar, cover } from './images';

export const COMMUNITIES: Community[] = [
  {
    id: 'cm-devs',
    name: { en: 'Baku Developers', az: 'Bakı Developerləri' },
    description: {
      en: 'A home for engineers of every stack. Code nights, study groups, and job leads.',
      az: 'Hər stekdən mühəndislər üçün ev. Kod gecələri, təlim qrupları və iş imkanları.',
    },
    category: 'technology',
    image: cover('cm-devs', 400, 400),
    cover: cover('cm-devs-cover', 1080, 500),
    memberCount: 3240,
    membership: 'public',
    joined: true,
    upcomingEventIds: ['ev-hackathon', 'ev-ai-workshop'],
    moderators: ['u1', 'u3'],
    rules: {
      en: 'Be kind. No spam. Keep job posts in the #jobs thread.',
      az: 'Mehriban ol. Spam yox. İş elanlarını #jobs mövzusunda saxla.',
    },
    announcements: [
      {
        id: 'an-1',
        author: 'Baku Dev Club',
        text: {
          en: 'Hackathon teams forming now — drop your skills in the thread.',
          az: 'Hakaton komandaları indi formalaşır — bacarıqlarını mövzuya yaz.',
        },
        date: '2026-10-16T12:00:00',
      },
    ],
    posts: [
      {
        id: 'po-1',
        author: 'Kamran',
        avatar: avatar(3),
        text: {
          en: 'Anyone pairing on the AI workshop prep this week?',
          az: 'Bu həftə AI seminarı hazırlığında cütləşmək istəyən varmı?',
        },
        date: '2026-10-17T09:30:00',
        likes: 12,
      },
      {
        id: 'po-2',
        author: 'Günel',
        avatar: avatar(29),
        text: {
          en: 'Sharing my notes from last month’s TypeScript night 📓',
          az: 'Keçən ayki TypeScript gecəsindən qeydlərimi paylaşıram 📓',
        },
        date: '2026-10-15T18:10:00',
        likes: 28,
      },
    ],
  },
  {
    id: 'cm-founders',
    name: { en: 'Founders Circle', az: 'Təsisçilər Dairəsi' },
    description: {
      en: 'Early-stage founders swapping lessons, intros, and the occasional co-founder.',
      az: 'Dərslər, tanışlıqlar və bəzən həmtəsisçi mübadiləsi edən erkən mərhələ təsisçilər.',
    },
    category: 'entrepreneurship',
    image: cover('cm-founders', 400, 400),
    cover: cover('cm-founders-cover', 1080, 500),
    memberCount: 890,
    membership: 'application',
    joined: false,
    upcomingEventIds: ['ev-founder-mixer', 'ev-startup-pitch'],
    moderators: ['u5'],
    rules: {
      en: 'Founders and operators only. Keep it confidential and constructive.',
      az: 'Yalnız təsisçilər və operatorlar. Məxfi və konstruktiv saxla.',
    },
    announcements: [
      {
        id: 'an-2',
        author: 'Founders Baku',
        text: {
          en: 'Applications for the autumn cohort close Friday.',
          az: 'Payız qrupu üçün müraciətlər cümə günü bağlanır.',
        },
        date: '2026-10-14T10:00:00',
      },
    ],
    posts: [],
  },
  {
    id: 'cm-lingua',
    name: { en: 'Polyglots of Baku', az: 'Bakı Poliqlotları' },
    description: {
      en: 'Language learners meeting weekly to practice and make friends.',
      az: 'Məşq etmək və dostlaşmaq üçün həftəlik görüşən dil öyrənənlər.',
    },
    category: 'languageExchange',
    image: cover('cm-lingua', 400, 400),
    cover: cover('cm-lingua-cover', 1080, 500),
    memberCount: 1520,
    membership: 'public',
    joined: true,
    upcomingEventIds: ['ev-lang-exchange'],
    moderators: ['u6'],
    rules: {
      en: 'All languages and levels welcome. Patience over perfection.',
      az: 'Bütün dillər və səviyyələr xoş gəlir. Mükəmməllikdən çox səbir.',
    },
    announcements: [],
    posts: [
      {
        id: 'po-3',
        author: 'Aytən',
        avatar: avatar(45),
        text: {
          en: 'Looking for a Turkish ↔ English partner for weekly calls!',
          az: 'Həftəlik zənglər üçün türk ↔ ingilis partnyoru axtarıram!',
        },
        date: '2026-10-16T20:00:00',
        likes: 9,
      },
    ],
  },
  {
    id: 'cm-green',
    name: { en: 'Green Volunteers', az: 'Yaşıl Könüllülər' },
    description: {
      en: 'People who show up for the planet — cleanups, planting, and awareness.',
      az: 'Planet üçün gələn insanlar — təmizlik, əkin və maarifləndirmə.',
    },
    category: 'volunteering',
    image: cover('cm-green', 400, 400),
    cover: cover('cm-green-cover', 1080, 500),
    memberCount: 2110,
    membership: 'public',
    joined: false,
    upcomingEventIds: ['ev-cleanup'],
    moderators: ['u4'],
    rules: {
      en: 'Leave places better than you found them.',
      az: 'Yerləri tapdığından daha yaxşı qoyub get.',
    },
    announcements: [],
    posts: [],
  },
  {
    id: 'cm-art',
    name: { en: 'Creative Baku', az: 'Yaradıcı Bakı' },
    description: {
      en: 'Photographers, designers, and makers sharing work and running meetups.',
      az: 'İş paylaşan və görüşlər keçirən fotoqraflar, dizaynerlər və yaradıcılar.',
    },
    category: 'art',
    image: cover('cm-art', 400, 400),
    cover: cover('cm-art-cover', 1080, 500),
    memberCount: 1340,
    membership: 'public',
    joined: false,
    upcomingEventIds: ['ev-photo-walk', 'ev-design-workshop'],
    moderators: ['u8'],
    rules: {
      en: 'Share, critique kindly, credit creators.',
      az: 'Paylaş, mehribanca tənqid et, yaradıcılara istinad et.',
    },
    announcements: [],
    posts: [],
  },
  {
    id: 'cm-serenity',
    name: { en: 'Serenity Circle', az: 'Serenity Dairəsi' },
    description: {
      en: 'A private peer-support community. Membership is by application; members stay anonymous.',
      az: 'Qapalı dəstək qrupu icması. Üzvlük müraciətlədir; üzvlər anonim qalır.',
    },
    category: 'peerSupport',
    image: cover('cm-serenity', 400, 400),
    cover: cover('cm-serenity-cover', 1080, 500),
    memberCount: 0,
    membership: 'private',
    joined: false,
    upcomingEventIds: ['ev-support'],
    moderators: [],
    rules: {
      en: 'Confidentiality is absolute. What is shared here stays here.',
      az: 'Məxfilik mütləqdir. Burada paylaşılan burada qalır.',
    },
    announcements: [],
    posts: [],
    sensitive: true,
  },
];

export function getCommunity(id: string): Community | undefined {
  return COMMUNITIES.find((c) => c.id === id);
}
