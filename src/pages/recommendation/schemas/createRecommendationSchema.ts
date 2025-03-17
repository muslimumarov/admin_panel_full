import { array, InferType, mixed, object, string } from "yup";
import { Language } from "../../../core/enums/Language.ts";
import { RecommendationStatus } from "../enums/RecommendationStatus.ts";
import { RecommendationTranslation } from "../interfaces/recommendation.interface.ts";

const createRecommendationSchema = (t: (text: string) => string) =>
  object().shape({
    translations: array<RecommendationTranslation>()
      .of(
        object({
          text: string().required(t("titleRequired")),
          description: string()
            .required(t("descriptionRequired"))
            .min(10, t("min120Chars")),
          language: string<Language>().required(),
        }),
      )
      .min(1)
      .required(),
    slug: string().optional(),
    image: mixed().required(t("posterRequired")),
    category: string().required(t("categoryRequired")),
    status: string<RecommendationStatus>().required(),
    tags: string().required(t("tagsRequired")),
  });

export type RecommendationFormType = InferType<
  ReturnType<typeof createRecommendationSchema>
>;

export default createRecommendationSchema;
