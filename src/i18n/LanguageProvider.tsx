import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import i18n, { AppLanguage } from './config';

type LanguageContextValue = {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<AppLanguage>(
    (i18n.language as AppLanguage) ?? 'en'
  );

  const setLanguage = useCallback((lang: AppLanguage) => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
  }, []);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

/** Picks a localized string from a {en, az} pair, falling back to en. */
export function pickLocale(
  language: AppLanguage,
  value: { en: string; az: string } | string
): string {
  if (typeof value === 'string') return value;
  return value[language] ?? value.en;
}
