import { useState } from "react";
import { AxiosError, AxiosRequestConfig, HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore.ts";
import request from "../../../request.ts";
import useToast from "../useToast.tsx";
import { get as lodashGet } from "lodash";

export type Url = string | number;

export interface RequestProps {
  options?: AxiosRequestConfig;
}

export interface GetProps extends RequestProps {
  params?: AxiosRequestConfig["params"];
}

export interface MutateProps extends RequestProps {
  data: AxiosRequestConfig["data"];
  url?: Url[];
}

export function useApi(url: Url[] = []) {
  const { setAccessToken } = useAuthStore();
  const { error } = useToast();
  const navigate = useNavigate();
  const baseUrl = ["/api"];
  const [loading, setLoading] = useState(false);

  async function get<TData>({ params, options }: GetProps) {
    try {
      setLoading(true);
      const response = await request.get<TData>(routeFormat(), {
        ...options,
        params,
      });
      return response.data;
    } catch (err: unknown) {
      catchError(err as AxiosError);
      throw err;
    } finally {
      catchFinally();
    }
  }

  async function mutate<TData>({ data, options, url = [] }: MutateProps) {
    try {
      setLoading(true);
      const response = await request<TData>(routeFormat(url), {
        ...options,
        data,
      });
      return response.data;
    } catch (err: unknown) {
      catchError(err as AxiosError);
      throw err;
    } finally {
      catchFinally();
    }
  }

  function catchError(err: AxiosError) {
    if (err.response) {
      error({ message: lodashGet(err, "response.data.message", "") });

      if (err.response.status === HttpStatusCode.Unauthorized) {
        setAccessToken(null);
        navigate("/auth");
      }

      if (err.response.status === HttpStatusCode.Forbidden) {
        navigate("/forbidden");
      }
    }

    throw err;
  }

  function catchFinally() {
    setLoading(false);
  }

  function routeFormat(path: Url[] = []) {
    return [...baseUrl, ...url, ...path].join("/");
  }

  return {
    loading,
    get,
    mutate,
  };
}
