import type { Speaker } from './types';
import { avatar } from './images';

export const SPEAKERS: Speaker[] = [
  {
    id: 'sp-1',
    name: 'Leyla Məmmədova',
    role: { en: 'AI Research Lead, Caspian Labs', az: 'Süni İntellekt üzrə Rəhbər, Caspian Labs' },
    avatar: avatar(25),
  },
  {
    id: 'sp-2',
    name: 'Rauf Əliyev',
    role: { en: 'Founder & CEO, Nexa', az: 'Təsisçi və CEO, Nexa' },
    avatar: avatar(15),
  },
  {
    id: 'sp-3',
    name: 'Nigar Hüseynli',
    role: { en: 'Product Designer, Studio Mono', az: 'Məhsul Dizayneri, Studio Mono' },
    avatar: avatar(44),
  },
  {
    id: 'sp-4',
    name: 'Tural Qasımov',
    role: { en: 'Staff Engineer, Ulduz', az: 'Baş Mühəndis, Ulduz' },
    avatar: avatar(33),
  },
  {
    id: 'sp-5',
    name: 'Aysel Rəhimova',
    role: { en: 'Partner, Caspian Ventures', az: 'Partnyor, Caspian Ventures' },
    avatar: avatar(26),
  },
  {
    id: 'sp-6',
    name: 'Emin Sultanov',
    role: { en: 'Jazz Pianist & Composer', az: 'Caz Pianoçusu və Bəstəkar' },
    avatar: avatar(51),
  },
];

export function getSpeaker(id: string): Speaker | undefined {
  return SPEAKERS.find((s) => s.id === id);
}
