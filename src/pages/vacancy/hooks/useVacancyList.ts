import { useCallback, useMemo } from "react";
import { createNewsColumn, createVacancyFilters } from "../helpers";
import { useTranslation } from "react-i18next";
import useList from "../../../core/hooks/useList.ts";
import { VacancyInterface } from "../interfaces/vacancy.interface.ts";
import useDelete from "../../../core/hooks/api/useDelete.ts";
import { Url } from "../../../core/hooks/api/useApi.ts";
import { VACANCY_QUERY_KEY } from "../constants/vacancy.constants.ts";
import { Language } from "../../../core/enums/Language.ts";

const useVacancyList = () => {
  const { t, i18n } = useTranslation();
  const { query, handleFilter } = useList<VacancyInterface>([
    VACANCY_QUERY_KEY,
  ]);
  const { remove } = useDelete([VACANCY_QUERY_KEY]);

  const handleDelete = useCallback(
    (id: Url) => {
      remove(id).then(() => {
        query.refetch();
      });
    },
    [remove],
  );

  console.log("list news from api", query.data);

  const columns = useMemo(
    () => createNewsColumn(t, handleDelete, i18n.language as Language),
    [t, handleDelete, i18n.language],
  );
  const filters = useMemo(() => createVacancyFilters(t), [t]);

  return {
    columns,
    dataSource: query.data,
    filters,
    handleFilter,
  };
};

export default useVacancyList;
