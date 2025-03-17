import { FilterInterface } from "../../../core/interfaces/filter.interface.ts";
import { RecommendationCategory } from "../enums/RecommendationCategory.ts";
import { RecommendationStatus } from "../enums/RecommendationStatus.ts";

const createRecommendationFilters = (
  t: (text: string) => string,
): FilterInterface[] => [
  {
    name: "category",
    label: t("type"),
    options: [
      { label: t("select"), value: null },
      {
        label: t("professional"),
        value: RecommendationCategory.PROFESSIONAL,
      },
      {
        label: t("educational"),
        value: RecommendationCategory.EDUCATIONAL,
      },
      {
        label: t("personalCategory"),
        value: RecommendationCategory.PERSONAL,
      },
    ],
  },
  {
    name: "status",
    label: t("status"),
    options: [
      { label: t("select"), value: null },
      {
        label: t("Active"),
        value: RecommendationStatus.ACTIVE,
      },
      {
        label: t("Inactive"),
        value: RecommendationStatus.INACTIVE,
      },
    ],
  },
];

export default createRecommendationFilters;
