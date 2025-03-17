import useListQuery from "./useListQuery.ts";
import { useEffect, useState } from "react";
import { isEqual } from "lodash";
import { DEFAULT_PARAMS } from "../constants/page.constants.ts";
import useQueryParams from "./useQueryParams.ts";
import { Url } from "./api/useApi.ts";

const useList = <TData>(url: Url[]) => {
  const { params: queryParams, handleSetParams } = useQueryParams();
  const [params, setParams] = useState({
    ...DEFAULT_PARAMS,
  });

  const { query } = useListQuery<TData>({ url, params });

  useEffect(() => {
    setParams((oldParams) => {
      const newParams = {
        ...DEFAULT_PARAMS,
        ...queryParams,
      };
      return !isEqual(newParams, oldParams) ? newParams : oldParams;
    });
  }, [queryParams]);

  return {
    query,
    handleFilter: handleSetParams,
  };
};

export default useList;
