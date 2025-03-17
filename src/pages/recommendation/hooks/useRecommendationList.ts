import { useCallback, useMemo } from "react";
import {
  createRecommendationColumn,
  createRecommendationFilters,
} from "../helpers";
import { useTranslation } from "react-i18next";
import useList from "../../../core/hooks/useList.ts";
import useDelete from "../../../core/hooks/api/useDelete.ts";
import { Url } from "../../../core/hooks/api/useApi.ts";
import { RecommendationInterface } from "../interfaces/recommendation.interface.ts";
import { RECOMMENDATION_QUERY_KEY } from "../constants/recommendation.constants.ts";
import { Language } from "../../../core/enums/Language.ts";

const useRecommendationList = () => {
  const { t, i18n } = useTranslation();

  const { query, handleFilter } = useList<RecommendationInterface>([
    RECOMMENDATION_QUERY_KEY,
  ]);
  const { remove } = useDelete([RECOMMENDATION_QUERY_KEY]);

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
    () =>
      createRecommendationColumn(t, handleDelete, i18n.language as Language),
    [t, handleDelete, i18n.language],
  );
  const filters = useMemo(() => createRecommendationFilters(t), [t]);

  return {
    columns,
    dataSource: query.data,
    filters,
    handleFilter,
  };
};

export default useRecommendationList;
