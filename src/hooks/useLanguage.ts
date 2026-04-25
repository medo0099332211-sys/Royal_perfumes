import { useState, useCallback, useEffect } from "react";
import { translations, type Language, type TranslationKey } from "@/lib/i18n";

const LANG_KEY = "kings_perfume_lang";

function getInitialLang(): Language {
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === "ar" || stored === "en") return stored;
  } catch {}
  return "en";
}

// Global singleton state
let globalLang: Language = getInitialLang();
const listeners: Set<() => void> = new Set();

function notifyAll() {
  listeners.forEach((fn) => fn());
}

export function useLanguage() {
  const [lang, setLangState] = useState<Language>(globalLang);

  useEffect(() => {
    const update = () => setLangState(globalLang);
    listeners.add(update);
    return () => { listeners.delete(update); };
  }, []);

  const setLang = useCallback((l: Language) => {
    globalLang = l;
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {}
    notifyAll();
  }, []);

  const toggleLang = useCallback(() => {
    setLang(globalLang === "en" ? "ar" : "en");
  }, [setLang]);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[lang][key] ?? translations.en[key] ?? key;
    },
    [lang]
  );

  const isRTL = lang === "ar";

  return { lang, setLang, toggleLang, t, isRTL };
}
