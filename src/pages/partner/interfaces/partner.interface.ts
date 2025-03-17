import { Language } from "../../../core/enums/Language.ts";
import { PartnerLanguage } from "./partner.language.interface.ts";

export interface PartnerInterface {
  id: number;
  url: string;
  logo: string;
  translations: Record<Language, PartnerLanguage>;
  createdAt: string;
  organization: string;
  updatedAt: string;
}
