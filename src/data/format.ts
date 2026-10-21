import type { AppLanguage } from '../i18n/config';

const MONTHS_SHORT: Record<AppLanguage, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  az: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn', 'İyl', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek'],
};

const MONTHS_FULL: Record<AppLanguage, string[]> = {
  en: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ],
  az: [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
    'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr',
  ],
};

const WEEKDAYS_FULL: Record<AppLanguage, string[]> = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  az: [
    'Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə',
    'Cümə axşamı', 'Cümə', 'Şənbə',
  ],
};

function parse(iso: string): Date {
  return new Date(iso);
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export function formatTime(iso: string): string {
  const d = parse(iso);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** "Oct 24" / "24 Okt" */
export function formatDateShort(iso: string, lang: AppLanguage): string {
  const d = parse(iso);
  const month = MONTHS_SHORT[lang][d.getMonth()];
  return lang === 'az' ? `${d.getDate()} ${month}` : `${month} ${d.getDate()}`;
}

/** "Oct 24 · 18:30" / "24 Okt · 18:30" */
export function formatDateTime(iso: string, lang: AppLanguage): string {
  return `${formatDateShort(iso, lang)} · ${formatTime(iso)}`;
}

/** "Saturday, 24 October" / "Şənbə, 24 Oktyabr" */
export function formatDateLong(iso: string, lang: AppLanguage): string {
  const d = parse(iso);
  const weekday = WEEKDAYS_FULL[lang][d.getDay()];
  const month = MONTHS_FULL[lang][d.getMonth()];
  return `${weekday}, ${d.getDate()} ${month}`;
}

/** Numeric price → "₼15" or null when free. */
export function formatPrice(n: number): string | null {
  if (n <= 0) return null;
  return `₼${n}`;
}

export function formatDistance(km: number): string {
  if (km <= 0) return '';
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km} km`;
}
