import { Language } from "../../../core/enums/Language.ts";
import { ManagementTranslation } from "./management.translation.ts";
import { DepartmentInterface } from "../../department/interfaces/department.interface.ts";
import { PositionInterface } from "../../position/interfaces/position.interface.ts";
import { SectionInterface } from "../../section/interfaces/section.interface.ts";

export interface ManagementInterface {
  id: number;
  department: DepartmentInterface;
  departmentId: number;
  position: PositionInterface;
  positionId: number;
  section: SectionInterface;
  sectionId: number;
  avatar: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  translations: Record<Language, ManagementTranslation>;
}
