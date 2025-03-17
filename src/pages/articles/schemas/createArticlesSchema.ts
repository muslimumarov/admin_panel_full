import { array, InferType, mixed, object, string } from "yup";
import { Language } from "../../../core/enums/Language.ts";
import { LanguageInterface } from "../../../core/interfaces/language.interface.ts";
import { ArticlesStatus } from "../enums/ArticlesStatus.ts";

const createArticlesSchema = (t: (text: string) => string) =>
  object().shape({
    translations: array<LanguageInterface>()
      .of(
        object({
          title: string().required(t("titleRequired")),
          content: string()
            .required(t("descriptionRequired"))
            .min(5, t("min120Chars")),
          language: string<Language>().required(),
        }),
      )
      // .min(1)
      .required(),
    slug: string().optional(),
    image: mixed().required(t("articleImageRequired")),
    status: string<ArticlesStatus>().required(),
    tags: string().required(t("tagsRequired")),
  });

export type ArticlesFormType = InferType<
  ReturnType<typeof createArticlesSchema>
>;

export default createArticlesSchema;
