import { useCallback, useMemo } from "react";
import { createNewsColumn, createNewsFilters } from "../helpers";
import { useTranslation } from "react-i18next";
import useList from "../../../core/hooks/useList.ts";
import { NewsInterface } from "../interfaces/news.interface.ts";
import useDelete from "../../../core/hooks/api/useDelete.ts";
import { Url } from "../../../core/hooks/api/useApi.ts";
import { NEWS_QUERY_KEY } from "../constants/news.constants.ts";
import { Language } from "../../../core/enums/Language.ts";
import useCategories from "../../../core/hooks/useCategories.ts";

const useNewsList = () => {
  const { t, i18n } = useTranslation();
  const { query, handleFilter } = useList<NewsInterface>([NEWS_QUERY_KEY]);
  const { remove } = useDelete([NEWS_QUERY_KEY]);
  const { categories } = useCategories();

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
  const filters = useMemo(
    () => createNewsFilters(t, categories),
    [t, categories],
  );

  return {
    columns,
    dataSource: query.data,
    filters,
    handleFilter,
  };
};

export default useNewsList;
