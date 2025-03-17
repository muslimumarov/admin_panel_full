import { useCallback, useMemo } from "react";
import { createUserColumn } from "../helpers";
import { useTranslation } from "react-i18next";
import useList from "../../../core/hooks/useList.ts";
import { UserInterface } from "../interfaces/user.interface.ts";
import useDelete from "../../../core/hooks/api/useDelete.ts";
import { Url } from "../../../core/hooks/api/useApi.ts";
import { USER_QUERY_KEY } from "../constants/user.constants.ts";

const useUserList = () => {
  const { t, i18n } = useTranslation();
  const { query, handleFilter } = useList<UserInterface>([USER_QUERY_KEY]);
  const { remove } = useDelete([USER_QUERY_KEY]);

  const handleDelete = useCallback(
    (id: Url) => {
      remove(id).then(() => {
        query.refetch();
      });
    },
    [remove],
  );
  console.log("list news from api", query.data);

  const columns = useMemo(
    () => createUserColumn(t, handleDelete),
    [handleDelete, i18n.language],
  );

  return {
    columns,
    dataSource: query.data,
    // filters,
    handleFilter,
  };
};

export default useUserList;
