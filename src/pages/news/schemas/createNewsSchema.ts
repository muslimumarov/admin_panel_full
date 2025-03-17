import { array, InferType, mixed, number, object, string } from "yup";
import { Language } from "../../../core/enums/Language.ts";
import { NewsStatus } from "../enums/NewsStatus.ts";
import { LanguageInterface } from "../../../core/interfaces/language.interface.ts";

const createNewsSchema = (t: (text: string) => string) =>
  object().shape({
    translations: array<LanguageInterface>()
      .of(
        object({
          title: string().required(t("titleRequired")),
          content: string()
            .required(t("descriptionRequired"))
            .min(10, t("min120Chars")),
          language: string<Language>().required(),
        }),
      )
      .min(1)
      .required(),
    slug: string().optional(),
    image: mixed().required(t("posterRequired")),
    categoryId: number().required(t("categoryRequired")),
    status: string<NewsStatus>().required(),
    video: mixed().optional(),
    tags: string().required(t("tagsRequired")),
  });

export type NewsFormType = InferType<ReturnType<typeof createNewsSchema>>;

export default createNewsSchema;
