import { NewsStatus } from "../enums/NewsStatus.ts";
import { Language } from "../../../core/enums/Language.ts";
import { LanguageInterface } from "../../../core/interfaces/language.interface.ts";
import { CategoryInterface } from "../../categories/interfaces/category.interface.ts";

export interface NewsInterface {
  id: number;
  image: string;
  newsCategory: CategoryInterface;
  categoryId: number;
  createdAt: string;
  slug: string;
  status: NewsStatus;
  translations: Record<Language, LanguageInterface>;
  tags?: string[];
  updatedAt: string;
  video?: string;
}
