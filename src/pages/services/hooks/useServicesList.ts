import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useList from "../../../core/hooks/useList.ts";
import { ServicesInterface } from "../interfaces/services.interface.ts";
import createServicesFilters from "../helpers/createServicesFilters.tsx";
import createServicesColumn from "../helpers/craeteServicesColumns.tsx";
import useDelete from "../../../core/hooks/api/useDelete.ts";
import { Url } from "../../../core/hooks/api/useApi.ts";
import { SERVICES_QUERY_KEY } from "../constants/services.constants.ts";
import { Language } from "../../../core/enums/Language.ts";

const useServicesList = () => {
  const { t, i18n } = useTranslation();
  const { query, handleFilter } = useList<ServicesInterface>([
    SERVICES_QUERY_KEY,
  ]);
  const { remove } = useDelete([SERVICES_QUERY_KEY]);

  const handleDelete = useCallback(
    (id: Url) => {
      remove(id).then(() => {
        query.refetch();
      });
    },
    [remove],
  );

  const columns = useMemo(
    () => createServicesColumn(t, handleDelete, i18n.language as Language),
    [t, handleDelete, i18n.language],
  );
  const filters = useMemo(() => createServicesFilters(t), [t]);
  return {
    columns,
    dataSource: query.data,
    filters,
    handleFilter,
  };
};

export default useServicesList;
