import { BaseInterface } from "../../../core/interfaces/base.interface.ts";
import { Language } from "../../../core/enums/Language.ts";

export interface CategoryInterface extends BaseInterface {
  translations: Record<Language, { title: string }>;
}
