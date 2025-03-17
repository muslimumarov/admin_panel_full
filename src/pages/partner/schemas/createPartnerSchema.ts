import { array, InferType, mixed, object, string } from "yup";
import { Language } from "../../../core/enums/Language.ts";
import { PartnerLanguage } from "../interfaces/partner.language.interface.ts";

const createPartnerSchema = (t: (text: string) => string) =>
  object().shape({
    translations: array<PartnerLanguage>()
      .of(
        object({
          organization: string().required(t("partnerRequired")),
          language: string<Language>().required(),
        }),
      )
      .min(1)
      .required(),
    logo: mixed().required(t("partnerImageRequired")),
    url: string().required(t("SeoLinkRequired")),
  });

export type PartnerFormType = InferType<ReturnType<typeof createPartnerSchema>>;

export default createPartnerSchema;
