import { Url, useApi } from "./useApi.ts";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface GetAllProps<TData> {
  params?: Record<string, unknown>;
  queryKey: Url;
  url: Url[];
  options?: Omit<UseQueryOptions<TData[]>, "queryFn" | "queryKey">;
}

const useGetAll = <TData = unknown>({
  url = [],
  params = {},
  options = {},
}: GetAllProps<TData>) => {
  const { get } = useApi(url);

  return useQuery<TData[]>({
    queryKey: url,
    queryFn: ({ signal }) => get<TData[]>({ params, options: { signal } }),
    ...options,
  });
};

export default useGetAll;
