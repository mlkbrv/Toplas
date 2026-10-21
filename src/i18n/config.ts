import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import en from './en';
import az from './az';

export const SUPPORTED_LANGUAGES = ['en', 'az'] as const;
export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

function detectLanguage(): AppLanguage {
  try {
    const locales = getLocales();
    const code = locales[0]?.languageCode?.toLowerCase();
    if (code === 'az') return 'az';
  } catch {
    // ignore — fall back to English
  }
  return 'en';
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    az: { translation: az },
  },
  lng: detectLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnNull: false,
  compatibilityJSON: 'v4',
});

export default i18n;
