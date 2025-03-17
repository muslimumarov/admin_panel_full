import { array, InferType, mixed, number, object, string } from "yup";
import { Language } from "../../../core/enums/Language.ts";
import { ManagementTranslation } from "../interfaces/management.translation.ts";

const createManagementSchema = (t: (text: string) => string) =>
  object().shape({
    translations: array<ManagementTranslation>()
      .of(
        object({
          fullname: string().required(t("fieldRequired")),
          tasks: string().required(t("taskRequired")).min(5, t("min120Chars")),
          language: string<Language>().required(),
        }),
      )
      .min(1)
      .required(),
    avatar: mixed().required(t("posterRequired")),
    departmentId: number().nullable(),
    sectionId: number().nullable(),
    positionId: number().required(t("positionRequired")),
    phone: string().required(t("phoneRequired")),
    email: string().optional(),
  });

export type ManagementFormType = InferType<
  ReturnType<typeof createManagementSchema>
>;

export default createManagementSchema;
