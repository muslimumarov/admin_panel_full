import { array, InferType, number, object, string } from "yup";
import { Language } from "../../../core/enums/Language.ts";
import { ChatStatus } from "../enums/ChatStatus.ts";

const createChatSchema = (t: (text: string) => string) =>
  object().shape({
    translations: array()
      .of(
        object().shape({
          title: string().required(t("titleRequired")),
          content: string()
            .required(t("descriptionRequired"))
            .min(120, t("min120Chars")),
          code: string<Language>().required(),
        }),
      )
      .min(1)
      .required(),
    slug: string().required(t("SEO Havola kiritish majburiy")),
    image: string().required(t("posterRequired")),
    category: string().required(t("Kategoriya tanlash majburiy")),
    status: string<ChatStatus>().required(),
    video: string().optional(),
    tags: array().of(string().required()).optional(),
    id: number().optional(),
    createdAt: string().optional(),
    updatedAt: string().optional(),
  });

export type ChatFormType = InferType<ReturnType<typeof createChatSchema>>;

export default createChatSchema;
