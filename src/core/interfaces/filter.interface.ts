import { SelectInterface } from "./select.interface";
import { ReactNode } from "react";

export interface FilterInterface {
  label?: ReactNode;
  value?: string | string[];
  name: string;
  isMulti?: boolean;
  options: SelectInterface[];
}
