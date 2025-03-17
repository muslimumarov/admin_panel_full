import { useCallback, useMemo } from "react";
import { createDocumentsColumns, createDocumentsFilters } from "../helpers";
import { useTranslation } from "react-i18next";
import useList from "../../../core/hooks/useList.ts";
import { DocumentsInterface } from "../interfaces/documents.interface.ts";
import useDelete from "../../../core/hooks/api/useDelete.ts";
import { Url } from "../../../core/hooks/api/useApi.ts";
import { DOCUMENT_QUERY_KEY } from "../constants/documents.constants.ts";
import { Language } from "../../../core/enums/Language.ts";
const useDocumentsList = () => {
  const { t, i18n } = useTranslation();
  const { query, handleFilter } = useList<DocumentsInterface>([
    DOCUMENT_QUERY_KEY,
  ]);
  const { remove } = useDelete([DOCUMENT_QUERY_KEY]);

  const handleDelete = useCallback(
    (id: Url) => {
      remove(id).then(() => {
        query.refetch();
      });
    },
    [remove],
  );

  const columns = useMemo(
    () => createDocumentsColumns(t, handleDelete, i18n.language as Language),
    [t, handleDelete, i18n.language],
  );
  const filters = useMemo(() => createDocumentsFilters(t), [t]);

  return {
    columns,
    dataSource: query.data,
    filters,
    handleFilter,
  };
};

export default useDocumentsList;
