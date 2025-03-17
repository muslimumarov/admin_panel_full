import { Language } from "../../../core/enums/Language.ts";
import { ServicesStatus } from "../enums/ServicesStatus.ts";
import { ServicesCategory } from "../enums/ServicesCategory.ts";
import { BaseLanguageInterface } from "../../../core/interfaces/base-language.interface.ts";

export interface ServicesTranslation extends BaseLanguageInterface {
  title: string;
  description: string;
}

export interface OrderSchemaField {
  name: string;
  type: "number" | "string";
  required: boolean;
}

export interface ServicesInterface {
  id: number;
  title: string;
  category?: ServicesCategory;
  status: ServicesStatus;
  description: string;
  translations: Record<Language, ServicesTranslation>;
  slug: string;
  price?: number;
  logo: string;
  tags: string[];
  documents: string[];
  contactInfo: string;
  createdAt: string;
  updatedAt: string;
  orderSchemaFields: OrderSchemaField[];
  orderSchema?: {
    fields: OrderSchemaField[];
  };
}
