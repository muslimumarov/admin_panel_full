import { FilterInterface } from "../../../core/interfaces/filter.interface";
import { DocumentsStatus } from "../enums/DocumentsStatus.ts";
import createDocumentsCategories from "../helpers/createDocumentCategories.tsx";

const createDocumentsFilters = (
  t: (text: string) => string,
): FilterInterface[] => {
  return [
    {
      name: "category",
      label: t("type"),
      options: [
        { label: t("select"), value: "" },
        ...createDocumentsCategories(t),
      ],
    },
    {
      name: "status",
      label: t("status"),
      options: [
        { label: t("select"), value: "" },
        {
          label: t("published"),
          value: DocumentsStatus.PUBLISHED,
        },
        {
          label: t("unpublished"),
          value: DocumentsStatus.DRAFT,
        },
      ],
    },
  ];
};

export default createDocumentsFilters;
