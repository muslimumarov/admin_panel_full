import { DocumentsStatus } from "../enums/DocumentsStatus.ts";
import { Language } from "../../../core/enums/Language.ts";
import { DocumentLanguage } from "./documents.language.ts";

export interface DocumentsInterface {
  id: number;
  category: string;
  size: string;
  documentUrl: string;
  downloadCount: number;
  files: string[];
  slug: string;
  status: DocumentsStatus;
  translations: Record<Language, DocumentLanguage>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
