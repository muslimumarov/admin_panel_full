import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { Language } from "./core/enums/Language.ts";

export const DEFAULT_LOCALE = Language.UZ;

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    partialBundledLanguages: true,
    backend: {
      loadPath: "/locales/{{lng}}.json",
    },
    fallbackLng: DEFAULT_LOCALE,
    debug: false,
    supportedLngs: [Language.UZ, Language.RU, Language.EN],
    detection: {
      order: [
        "cookie",
        "querystring",
        "htmlTag",
        "localStorage",
        "path",
        "subdomain",
      ],
      caches: ["cookie"],
    },
    saveMissing: false,
    react: {
      useSuspense: false,
    },
  });
export default i18n;
