import { array, InferType, number, object, string } from "yup";
import { Language } from "../../../core/enums/Language.ts";
import { LanguageInterface } from "../../../core/interfaces/language.interface.ts";

const createSectionSchema = (t: (text: string) => string) =>
  object().shape({
    translations: array<LanguageInterface>()
      .of(
        object({
          title: string().required(t("sectionRequired")),
          language: string<Language>().required(),
        }),
      )
      .min(1)
      .required(),
    departmentId: number().nullable(),
  });

export type SectionFormType = InferType<ReturnType<typeof createSectionSchema>>;

export default createSectionSchema;
