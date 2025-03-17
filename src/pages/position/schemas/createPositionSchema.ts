import { array, InferType, object, string } from "yup";
import { Language } from "../../../core/enums/Language.ts";
import { LanguageInterface } from "../../../core/interfaces/language.interface.ts";

const createPositionSchema = (t: (text: string) => string) =>
  object().shape({
    translations: array<LanguageInterface>()
      .of(
        object({
          language: string<Language>().required(t("languageRequired")),
          title: string().required(t("titleRequired")),
        }),
      )
      .min(1, t("atLeastOneTranslation"))
      .required(),
  });

export type PositionFormType = InferType<
  ReturnType<typeof createPositionSchema>
>;

export default createPositionSchema;
