import useListQuery from "../../../core/hooks/useListQuery.ts";
import { MAX_LIMIT } from "../../../core/constants/page.constants.ts";
import { useTranslation } from "react-i18next";
import { SelectInterface } from "../../../core/interfaces/select.interface.ts";
import { useMemo } from "react";
import get from "lodash/get";
import { DEPARTMENT_QUERY_KEY } from "../../department/contants/Department.constants.ts";
import { DepartmentInterface } from "../../department/interfaces/department.interface.ts";

const useDepartments = () => {
  const { i18n } = useTranslation();
  const { query } = useListQuery<DepartmentInterface>({
    url: [DEPARTMENT_QUERY_KEY],
    params: { limit: MAX_LIMIT },
  });

  console.log("from api server", query);

  const departments = useMemo<SelectInterface[]>(
    () =>
      query.data?.data?.map((department) => ({
        value: department.id,
        label: get(department.translations, `${i18n.language}.title`, ""),
      })) || [],
    [query.data, i18n.language],
  );

  return {
    departments,
  };
};

export default useDepartments;
