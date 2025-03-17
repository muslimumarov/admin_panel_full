import { array, InferType, mixed, object, string } from "yup";
import { Language } from "../../../core/enums/Language.ts";
import { DocumentsStatus } from "../enums/DocumentsStatus.ts";
import { DocumentLanguage } from "../interfaces/documents.language.ts";

const createDocumentsSchema = (t: (text: string) => string) =>
  object().shape({
    translations: array<DocumentLanguage>()
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
    slug: string().optional(),
    files: mixed().required(t("fileUploadRequired")),
    category: string().required(t("categoryRequired")),
    status: string<DocumentsStatus>().required(),
    tags: string().required(t("tagsRequired")),
    documentUrl: string().optional(),
  });

export type DocumentFormType = InferType<
  ReturnType<typeof createDocumentsSchema>
>;

export default createDocumentsSchema;
