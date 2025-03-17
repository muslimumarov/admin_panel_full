import { Url, useApi } from "./useApi.ts";
import { AxiosRequestConfig } from "axios";
import { useCallback } from "react";
import { MutateRequestMethod } from "../../enums/MutateRequestMethod.ts";

function useDelete<TData>(url: Url[] = []) {
  const { mutate } = useApi(url);

  const remove = useCallback(
    (id: Url, data?: AxiosRequestConfig["data"]) =>
      mutate<TData>({
        url: [id],
        data,
        options: { method: MutateRequestMethod.DELETE },
      }),
    [],
  );

  return { remove };
}

export default useDelete;
