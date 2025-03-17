import { array, InferType, mixed, object, string, boolean, number } from "yup";
import { Language } from "../../../core/enums/Language.ts";
import { ServicesStatus } from "../enums/ServicesStatus.ts";
import { ServicesTranslation } from "../interfaces/services.interface.ts";

const createServicesSchema = (t: (text: string) => string) =>
  object().shape({
    translations: array<ServicesTranslation>()
      .of(
        object({
          title: string().required(t("titleRequired")),
          description: string()
            .required(t("descriptionRequired"))
            .min(5, t("min120Chars")),
          language: string<Language>().required(),
        }),
      )
      .min(1)
      .required(),
    logo: mixed().required(t("posterRequired")),
    status: string<ServicesStatus>().required(),
    documents: mixed().optional(),
    slug: mixed().required(),
    price: number().optional(),
    contactInfo: string().required(t("phoneRequired")),
    tags: string().required(t("tagsRequired")),

    orderSchemaFields: array()
      .of(
        object({
          name: string().required(t("fieldNameRequired")),
          type: string()
            .oneOf(["string", "number", "string"], t("mandatoryStatusRequired"))
            .required(t("dataTypeRequired")),
          required: boolean().required(t("mandatoryStatusRequired")),
        }),
      )
      .optional(),
  });

export type ServicesFormType = InferType<
  ReturnType<typeof createServicesSchema>
>;

export default createServicesSchema;
