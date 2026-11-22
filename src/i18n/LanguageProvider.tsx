'use client';

import { type ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';

import en from './en.json';
import th from './th.json';

export type Lang = 'th' | 'en';
export type Dict = typeof th;

const dicts: Record<Lang, Dict> = { th, en };
const STORAGE_KEY = 'glfloors-lang';

type Ctx = { lang: Lang; t: Dict; setLang: (lang: Lang) => void };

const LanguageContext = createContext<Ctx>({ lang: 'th', t: th, setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>('th');

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved === 'en' || saved === 'th') setLangState(saved);
        } catch {
            // storage unavailable: stay on Thai
        }
    }, []);

    useEffect(() => {
        document.documentElement.lang = lang;
        document.title = dicts[lang].meta.title;
    }, [lang]);

    const setLang = useCallback((next: Lang) => {
        setLangState(next);
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // ignore
        }
    }, []);

    return <LanguageContext.Provider value={{ lang, t: dicts[lang], setLang }}>{children}</LanguageContext.Provider>;
}

export const useI18n = () => useContext(LanguageContext);
