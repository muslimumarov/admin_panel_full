import { useEffect, useState } from "react";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { DashboardInterface } from "../interface/dashboard.interface.ts";
import { FilterProps } from "../../../core/components/moleculas/table/DataTable.tsx";

export const useDashboardData = (params?: FilterProps<never>) => {
  const [data, setData] = useState<DashboardInterface>();

  const query = useGetOne<DashboardInterface>({
    id: "",
    url: ["dashboard"],
    params: params || {},
  });

  useEffect(() => {
    if (query.data) {
      setData(query.data);
    }
  }, [query.data]);

  const refreshData = () => {
    query.refetch();
  };

  return {
    data,
    refreshData,
    isLoading: query.isLoading,
  };
};
