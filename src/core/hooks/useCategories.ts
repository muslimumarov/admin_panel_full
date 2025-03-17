import useListQuery from "./useListQuery.ts";
import { MAX_LIMIT } from "../constants/page.constants.ts";
import { CategoryInterface } from "../../pages/categories/interfaces/category.interface.ts";
import { CATEGORY_QUERY_KEY } from "../../pages/categories/contants/category.constants.ts";
import { useTranslation } from "react-i18next";
import { SelectInterface } from "../interfaces/select.interface.ts";
import { useMemo } from "react";
import get from "lodash/get";

const useCategories = () => {
  const { i18n } = useTranslation();
  const { query } = useListQuery<CategoryInterface>({
    url: [CATEGORY_QUERY_KEY],
    params: { limit: MAX_LIMIT },
  });

  const categories = useMemo<SelectInterface[]>(
    () =>
      query.data?.data?.map((category) => ({
        value: category.id,
        label: get(category.translations, `${i18n.language}.title`, ""),
      })) || [],
    [query.data, i18n.language],
  );

  return {
    categories,
  };
};

export default useCategories;
