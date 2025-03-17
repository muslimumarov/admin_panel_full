import { array, InferType, number, object, string } from "yup";
import { Language } from "../../../core/enums/Language.ts";
import { VacancyStatus } from "../enums/VacancyStatus.ts";
import { VacancyLanguageInterface } from "../interfaces/vacancy.language.interfaces.ts";

const createVacancySchema = (t: (text: string) => string) =>
  object().shape({
    translations: array<VacancyLanguageInterface>()
      .of(
        object({
          title: string().required(t("titleRequired")),
          location: string().required(t("addressRequired")),
          requirements: string().required(t("requirementsRequired")),
          responsibilities: string().required(t("responsibilitiesRequired")),
          workConditions: string()
            .required(t("workConditionsRequired"))
            .min(10, t("min120Chars")),
          language: string<Language>().required(),
        }),
      )
      .min(1)
      .required(),
    skills: string().optional(),
    status: string<VacancyStatus>().required(),
    employmentType: string().required(t("employmentType")),
    salary: number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value,
      )
      .nullable()
      .required(t("salaryRequired")),
  });

export type VacancyFormType = InferType<ReturnType<typeof createVacancySchema>>;

export default createVacancySchema;
