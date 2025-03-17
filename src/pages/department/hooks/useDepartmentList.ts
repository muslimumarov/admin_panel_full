import { useCallback, useMemo } from "react";
import { createDepartmentColumns } from "../helpers";
import { useTranslation } from "react-i18next";
import useList from "../../../core/hooks/useList.ts";
import { DepartmentInterface } from "../interfaces/department.interface.ts";
import useDelete from "../../../core/hooks/api/useDelete.ts";
import { Url } from "../../../core/hooks/api/useApi.ts";
import { DEPARTMENT_QUERY_KEY } from "../contants/Department.constants.ts";
import useToast from "../../../core/hooks/useToast.tsx";

const useDepartmentList = () => {
  const { t } = useTranslation();
  const { success } = useToast();
  const { query, handleFilter } = useList<DepartmentInterface>([
    DEPARTMENT_QUERY_KEY,
  ]);
  const { remove } = useDelete([DEPARTMENT_QUERY_KEY]);

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
    () => createDepartmentColumns(t, handleDelete),
    [t, handleDelete],
  );

  return {
    columns,
    dataSource: query.data,
    handleFilter,
  };
};

export default useDepartmentList;
