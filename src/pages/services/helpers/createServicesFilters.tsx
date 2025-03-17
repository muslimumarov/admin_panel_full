import { FilterInterface } from "../../../core/interfaces/filter.interface";
import { ServicesStatus } from "../enums/ServicesStatus.ts";

const createServicesFilters = (
  t: (text: string) => string,
): FilterInterface[] => [
  {
    name: "status",
    label: t("status"),
    options: [
      { label: t("status"), value: "" },
      {
        label: t("Active"),
        value: ServicesStatus.ACTIVE,
      },
      {
        label: t("Inactive"),
        value: ServicesStatus.INACTIVE,
      },
    ],
  },
];

export default createServicesFilters;
