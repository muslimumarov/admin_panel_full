import { Language } from "../../../core/enums/Language.ts";

export interface VacancyLanguageInterface {
  title: string;
  location: string;
  requirements: string;
  workConditions: string;
  responsibilities: string;
  language: Language;
}
