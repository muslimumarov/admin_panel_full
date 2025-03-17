import { Language } from "../enums/Language.ts";

export interface TranslationInterface {
  title: string;
  content: string;
  lang: Language;
}
