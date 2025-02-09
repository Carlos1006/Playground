import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

import engJson from "./locales/eng.json";
import esJson from "./locales/esp.json";

const resources = {
  en: {
    translation: engJson,
  },
  es: {
    translation: esJson,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "es", // Idioma por defecto si no detecta uno válido
  interpolation: { escapeValue: false },
});

export default i18n;
