import { useEffect } from "react";
import { debounce, isEmpty } from "lodash";
import { Url } from "./api/useApi.ts";
import usePagination from "./api/usePagination.ts";

interface NewsProps {
  params?: Record<string, unknown>;
  url: Url[];
}

const useListQuery = <TData>({ url, params }: NewsProps) => {
  const query = usePagination<TData>({
    url,
    params: { ...params },
    options: {
      enabled: false,
      retry: 0,
    },
  });

  useEffect(() => {
    if (!isEmpty(params)) {
      debounce(query.refetch, 100)();
    }
  }, [JSON.stringify(params)]);

  return {
    query,
  };
};

export default useListQuery;
