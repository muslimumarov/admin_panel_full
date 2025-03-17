import { FilterInterface } from "../../../core/interfaces/filter.interface";
import { OrderStatus } from "../enums/OrderStatus.ts";

const createOrderFilters = (t: (text: string) => string): FilterInterface[] => [
  {
    name: "status",
    label: t("status"),
    options: [
      { label: t("select"), value: "" },
      {
        label: t("Pending"),
        value: OrderStatus.PENDING,
      },
      {
        label: t("inProgress"),
        value: OrderStatus.IN_PROGRESS,
      },
      {
        label: t("Completed"),
        value: OrderStatus.COMPLETED,
      },
      {
        label: t("canceled"),
        value: OrderStatus.CANCELED,
      },
    ],
  },
];

export default createOrderFilters;
