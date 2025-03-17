import { RecommendationStatus } from "../enums/RecommendationStatus.ts";
import { RecommendationCategory } from "../enums/RecommendationCategory.ts";
import { BaseLanguageInterface } from "../../../core/interfaces/base-language.interface.ts";
import { Language } from "../../../core/enums/Language.ts";

export interface RecommendationTranslation extends BaseLanguageInterface {
  text: string;
  description: string;
}
export interface RecommendationInterface {
  id: number;
  category: RecommendationCategory;
  createdAt: string;
  updatedAt: string;
  image: string;
  readMoreLink: string;
  slug: string;
  status: RecommendationStatus;
  tags: string[];
  translations: Record<Language, RecommendationTranslation>;
}
