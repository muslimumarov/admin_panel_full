import { ArticlesStatus } from "../enums/ArticlesStatus.ts";
import { Language } from "../../../core/enums/Language.ts";
import { LanguageInterface } from "../../../core/interfaces/language.interface.ts";

export interface ArticlesInterface {
  id: number;
  image: string;
  createdAt: string;
  slug: string;
  status: ArticlesStatus;
  translations: Record<Language, LanguageInterface>;
  tags: string[];
  updatedAt: string;
}
