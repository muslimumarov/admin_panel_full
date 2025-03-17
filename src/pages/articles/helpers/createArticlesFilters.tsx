import { FilterInterface } from "../../../core/interfaces/filter.interface";
import { ArticlesStatus } from "../enums/ArticlesStatus.ts";

const createArticlesFilters = (
  t: (text: string) => string,
): FilterInterface[] => [
  {
    name: "status",
    label: t("Holati"),
    options: [
      { label: t("Tanlang"), value: "" },
      {
        label: t("Chop etilgan"),
        value: ArticlesStatus.PUBLISHED,
      },
      {
        label: t("Chop etilmagan"),
        value: ArticlesStatus.DRAFT,
      },
    ],
  },
];

export default createArticlesFilters;
