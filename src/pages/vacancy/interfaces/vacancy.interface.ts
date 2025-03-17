import { VacancyStatus } from "../enums/VacancyStatus.ts";
import { Language } from "../../../core/enums/Language.ts";
import { VacancyLanguageInterface } from "./vacancy.language.interfaces.ts";

export interface VacancyInterface {
  id: number;
  createdAt: string;
  status: VacancyStatus;
  salary: number;
  translations: Record<Language, VacancyLanguageInterface>;
  skills: string[];
  updatedAt: string;
  employmentType: string;
}
