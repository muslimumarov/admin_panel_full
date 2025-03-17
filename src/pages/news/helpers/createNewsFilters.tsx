import { FilterInterface } from "../../../core/interfaces/filter.interface";
import { NewsStatus } from "../enums/NewsStatus.ts";
import { SelectInterface } from "../../../core/interfaces/select.interface";

const createNewsFilters = (
  t: (text: string) => string,
  categories: SelectInterface[],
): FilterInterface[] => {
  return [
    {
      name: "categoryId",
      label: t("type"),
      options: [{ label: t("select"), value: "" }, ...categories],
    },
    {
      name: "status",
      label: t("Status"),
      options: [
        { label: t("select"), value: "" },
        {
          label: t("published"),
          value: NewsStatus.PUBLISHED,
        },
        {
          label: t("unpublished"),
          value: NewsStatus.DRAFT,
        },
      ],
    },
  ];
};

export default createNewsFilters;
