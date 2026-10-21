import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from './LanguageProvider';
import type { Localized } from '../data/types';

/**
 * One hook for everything screens need from i18n:
 *   t    — translate UI chrome keys
 *   lang — current language ('en' | 'az')
 *   L    — pick a localized data string for the current language
 */
export function useLocale() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  const L = useCallback(
    (value: Localized | string): string => {
      if (typeof value === 'string') return value;
      return value[language] ?? value.en;
    },
    [language]
  );

  return { t, lang: language, setLanguage, L };
}
