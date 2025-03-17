import { SelectInterface } from "../../../core/interfaces/select.interface.ts";
import { DocumentCategory } from "../enums/DocumentCategory.ts";

const createDocumentsCategories = (
  t: (text: string) => string,
): SelectInterface[] =>
  Object.entries(DocumentCategory).map(([key, value]) => ({
    value: value,
    label: t(key),
  }));

export default createDocumentsCategories;
