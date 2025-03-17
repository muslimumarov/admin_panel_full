import { FilterInterface } from "../../../core/interfaces/filter.interface";
import { VacancyStatus } from "../enums/VacancyStatus.ts";

const createVacancyFilters = (
  t: (text: string) => string,
): FilterInterface[] => [
  {
    name: "status",
    label: t("status"),
    options: [
      { label: t("select"), value: "" },
      {
        label: t("Active"),
        value: VacancyStatus.ACTIVE,
      },
      {
        label: t("Inactive"),
        value: VacancyStatus.INACTIVE,
      },
    ],
  },
];

export default createVacancyFilters;
