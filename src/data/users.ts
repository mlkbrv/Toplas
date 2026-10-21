import type { AttendeePreview, UserProfile } from './types';
import { avatar } from './images';

export const CURRENT_USER: UserProfile = {
  id: 'me',
  name: 'Alex',
  avatar: avatar(8),
  city: { en: 'Baku, Azerbaijan', az: 'Bakı, Azərbaycan' },
  bio: {
    en: 'Product-minded developer. Into startups, design, and meeting curious people over coffee.',
    az: 'Məhsul düşüncəli developer. Startaplar, dizayn və maraqlı insanlarla qəhvə üstündə tanışlıq həvəskarı.',
  },
  interests: ['technology', 'startups', 'networking', 'music', 'languageExchange'],
  skills: ['React Native', 'TypeScript', 'UI Design', 'Public Speaking'],
  languages: ['Azerbaijani', 'English', 'Turkish'],
  connections: 148,
  isOrganizer: true,
};

export const ATTENDEES: AttendeePreview[] = [
  { id: 'u1', name: 'Kamran', avatar: avatar(3), mutualInterests: 4 },
  { id: 'u2', name: 'Səbinə', avatar: avatar(24), mutualInterests: 3 },
  { id: 'u3', name: 'Elvin', avatar: avatar(52), mutualInterests: 2 },
  { id: 'u4', name: 'Günel', avatar: avatar(29), mutualInterests: 5 },
  { id: 'u5', name: 'Murad', avatar: avatar(60), mutualInterests: 1 },
  { id: 'u6', name: 'Aytən', avatar: avatar(45), mutualInterests: 3 },
  { id: 'u7', name: 'Rəşad', avatar: avatar(57), mutualInterests: 2 },
  { id: 'u8', name: 'Lamiyə', avatar: avatar(41), mutualInterests: 4 },
];

export function attendeesFor(ids: string[]): AttendeePreview[] {
  return ids
    .map((id) => ATTENDEES.find((a) => a.id === id))
    .filter((a): a is AttendeePreview => Boolean(a));
}
