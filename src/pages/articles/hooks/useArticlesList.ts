import { useCallback, useMemo } from "react";
import { createArticlesColumns, createArticlesFilters } from "../helpers";
import { useTranslation } from "react-i18next";
import useList from "../../../core/hooks/useList.ts";
import { ArticlesInterface } from "../interfaces/articles.interface.ts";
import useDelete from "../../../core/hooks/api/useDelete.ts";
import { Url } from "../../../core/hooks/api/useApi.ts";
import { ARTICLES_QUERY_KEY } from "../constants/articles.constants.ts";
import { Language } from "../../../core/enums/Language.ts";

const useArticlesList = () => {
  const { t, i18n } = useTranslation();
  const { query, handleFilter } = useList<ArticlesInterface>([
    ARTICLES_QUERY_KEY,
  ]);
  const { remove } = useDelete([ARTICLES_QUERY_KEY]);

  const handleDelete = useCallback(
    (id: Url) => {
      remove(id).then(() => {
        query.refetch();
      });
    },
    [remove],
  );

  const columns = useMemo(
    () => createArticlesColumns(t, handleDelete, i18n.language as Language),
    [t, handleDelete, i18n.language],
  );
  const filters = useMemo(() => createArticlesFilters(t), [t]);

  return {
    columns,
    dataSource: query.data,
    filters,
    handleFilter,
  };
};

export default useArticlesList;
