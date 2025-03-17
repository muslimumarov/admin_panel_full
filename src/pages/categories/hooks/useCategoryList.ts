import { useCallback, useMemo } from "react";
import { createCategoryColumns } from "../helpers";
import { useTranslation } from "react-i18next";
import useList from "../../../core/hooks/useList.ts";
import { CategoryInterface } from "../interfaces/category.interface.ts";
import useDelete from "../../../core/hooks/api/useDelete.ts";
import { Url } from "../../../core/hooks/api/useApi.ts";
import { CATEGORY_QUERY_KEY } from "../contants/category.constants.ts";
import useToast from "../../../core/hooks/useToast.tsx";

const useCategoryList = () => {
  const { t } = useTranslation();
  const { success } = useToast();
  const { query, handleFilter } = useList<CategoryInterface>([
    CATEGORY_QUERY_KEY,
  ]);
  const { remove } = useDelete([CATEGORY_QUERY_KEY]);

  const handleDelete = useCallback(
    (id: Url) => {
      remove(id).then(() => {
        query.refetch();
        success({});
      });
    },
    [remove],
  );

  const columns = useMemo(
    () => createCategoryColumns(t, handleDelete),
    [t, handleDelete],
  );

  return {
    columns,
    dataSource: query.data,
    handleFilter,
  };
};

export default useCategoryList;
