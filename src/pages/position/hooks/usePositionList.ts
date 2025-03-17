import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useList from "../../../core/hooks/useList.ts";
import useDelete from "../../../core/hooks/api/useDelete.ts";
import { Url } from "../../../core/hooks/api/useApi.ts";
import useToast from "../../../core/hooks/useToast.tsx";
import { POSITION_QUERY_KEY } from "../contants/position.constants.ts";
import { createPositionColumns } from "../helpers";
import { PositionInterface } from "../interfaces/position.interface.ts";

const usePositionList = () => {
  const { t } = useTranslation();
  const { success } = useToast();
  const { query, handleFilter } = useList<PositionInterface>([
    POSITION_QUERY_KEY,
  ]);
  const { remove } = useDelete([POSITION_QUERY_KEY]);

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
    () => createPositionColumns(t, handleDelete),
    [t, handleDelete],
  );

  return {
    columns,
    dataSource: query.data,
    handleFilter,
  };
};

export default usePositionList;
