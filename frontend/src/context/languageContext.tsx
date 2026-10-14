import React, { createContext, useContext, useState } from "react";
import { pt } from "../locales/portuguese";
import { en } from "../locales/english";

type Language = "pt" | "en";

interface LanguageContextType {
  language: Language;
  translations: typeof pt;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
  };

  const translations = language === "pt" ? pt : en;

  return (
    <LanguageContext.Provider
      value={{ language, translations, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage deve ser usado dentro de um LanguageProvider");
  }
  return context;
}
