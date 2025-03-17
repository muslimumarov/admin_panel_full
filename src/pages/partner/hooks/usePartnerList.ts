import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useList from "../../../core/hooks/useList.ts";
import { PartnerInterface } from "../interfaces/partner.interface.ts";
import useDelete from "../../../core/hooks/api/useDelete.ts";
import { Url } from "../../../core/hooks/api/useApi.ts";
import { Language } from "../../../core/enums/Language.ts";
import { PARTNER_QUERY_KEY } from "../constants/partner.constants.ts";
import createPartnerColumns from "../helpers/createPartnerColumns.tsx";

const usePartnerList = () => {
  const { t, i18n } = useTranslation();
  const { query, handleFilter } = useList<PartnerInterface>([
    PARTNER_QUERY_KEY,
  ]);
  const { remove } = useDelete([PARTNER_QUERY_KEY]);

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
    () => createPartnerColumns(t, handleDelete, i18n.language as Language),
    [t, handleDelete, i18n.language],
  );

  return {
    columns,
    dataSource: query.data,
    handleFilter,
  };
};

export default usePartnerList;
