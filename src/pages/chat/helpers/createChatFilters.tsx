import { FilterInterface } from "../../../core/interfaces/filter.interface";
import { Category } from "../../../core/enums/Category.ts";

const createChatFilters = (t: (text: string) => string): FilterInterface[] => [
  {
    name: "category",
    label: t("Tiofasi"),
    options: [
      { label: t("Tanlang"), value: "" },
      {
        label: t("Mahaliy"),
        value: Category.LOCAL,
      },
      {
        label: t("Xalqaro"),
        value: Category.GLOBAL,
      },
    ],
  },
];

export default createChatFilters;
