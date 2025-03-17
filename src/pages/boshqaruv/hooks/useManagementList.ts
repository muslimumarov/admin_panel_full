import { useCallback, useMemo } from "react";
import { createManagementColumns } from "../helpers";
import { useTranslation } from "react-i18next";
import useList from "../../../core/hooks/useList.ts";
import { ManagementInterface } from "../interfaces/management.interface.ts";
import useDelete from "../../../core/hooks/api/useDelete.ts";
import { Url } from "../../../core/hooks/api/useApi.ts";
import { MANAGEMENT_QUERY_KEY } from "../constants/management.constants.ts";
import { Language } from "../../../core/enums/Language.ts";

const useManagementList = () => {
  const { t, i18n } = useTranslation();

  const { query, handleFilter } = useList<ManagementInterface>([
    MANAGEMENT_QUERY_KEY,
  ]);
  const { remove } = useDelete([MANAGEMENT_QUERY_KEY]);

  const handleDelete = useCallback(
    (id: Url) => {
      remove(id).then(() => {
        query.refetch();
      });
    },
    [remove],
  );

  const columns = useMemo(
    () => createManagementColumns(t, handleDelete, i18n.language as Language),
    [t, handleDelete, i18n.language],
  );

  return {
    columns,
    dataSource: query.data,
    handleFilter,
  };
};

export default useManagementList;
