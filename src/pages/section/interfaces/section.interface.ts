import { BaseInterface } from "../../../core/interfaces/base.interface.ts";
import { Language } from "../../../core/enums/Language.ts";
import { DepartmentInterface } from "../../department/interfaces/department.interface.ts";

export interface SectionInterface extends BaseInterface {
  department: DepartmentInterface;
  departmentId: number;
  translations: Record<Language, { title: string }>;
}
