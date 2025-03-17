import { BaseInterface } from "../../../core/interfaces/base.interface.ts";
import { Language } from "../../../core/enums/Language.ts";

export interface DepartmentInterface extends BaseInterface {
  id: number;
  translations: Record<Language, { title: string }>;
}
