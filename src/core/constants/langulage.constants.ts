import { Language } from "../enums/Language.ts";
import { SelectInterface } from "../interfaces/select.interface.ts";

export const LANGUAGES: SelectInterface[] = [
  {
    value: Language.UZ,
    label: "O'zbekcha",
  },
  {
    value: Language.RU,
    label: "Русский",
  },
  {
    value: Language.EN,
    label: "English",
  },
];
