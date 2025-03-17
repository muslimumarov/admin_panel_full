import { FilterInterface } from "../../../core/interfaces/filter.interface";
import { EventsStatus } from "../enums/EventsStatus.ts";

const createEventsFilters = (
  t: (text: string) => string,
): FilterInterface[] => [
  {
    name: "producer",
    label: t("reporter"),
    options: [
      { label: t("select"), value: "" },
      {
        label: t("legalEntity"),
        value: EventsStatus.LEGAL,
      },
      {
        label: t("legalEntity"),
        value: EventsStatus.ILLEGAL,
      },
    ],
  },
];

export default createEventsFilters;
