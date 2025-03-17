import { Url, useApi } from "./useApi.ts";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface GetOneProps<TData> {
  id: Url;
  params?: Record<string, unknown>;
  url: Url[];
  options?: Omit<UseQueryOptions<TData>, "queryFn" | "queryKey">;
}

const useGetOne = <TData = unknown>({
  id,
  url = [],
  params = {},
  options = {},
}: GetOneProps<TData>) => {
  const { get } = useApi([...url, id]);

  return useQuery<TData>({
    queryKey: [...url, id],
    queryFn: ({ signal }) => get<TData>({ params, options: { signal } }),
    ...options,
  });
};

export default useGetOne;
