import { array, InferType, object, string } from "yup";
import { Language } from "../../../core/enums/Language.ts";
import { LanguageInterface } from "../../../core/interfaces/language.interface.ts";

const createDepartmentSchema = (t: (text: string) => string) =>
  object().shape({
    translations: array<LanguageInterface>()
      .of(
        object({
          title: string().required(t("departmentRequired")),
          language: string<Language>().required(),
        }),
      )
      .min(1)
      .required(),
  });

export type DepartmentFormType = InferType<
  ReturnType<typeof createDepartmentSchema>
>;

export default createDepartmentSchema;
