import { Url, useApi } from "./useApi.ts";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { PaginationInterface } from "../../interfaces/pagination.interface.ts";

interface PaginationProps<TData> {
  params?: Record<string, unknown>;
  url: Url[];
  options?: Omit<
    UseQueryOptions<PaginationInterface<TData>>,
    "queryFn" | "queryKey"
  >;
}

const usePagination = <TData = unknown>({
  url = [],
  params = {},
  options = {},
}: PaginationProps<TData>) => {
  const { get } = useApi(url);

  return useQuery<PaginationInterface<TData>>({
    queryKey: [...url],
    queryFn: ({ signal }) =>
      get<PaginationInterface<TData>>({ params, options: { signal } }),
    ...options,
  });
};

export default usePagination;
