import { useCallback, useEffect, useMemo, useState } from "react";
import { createOrderColumns, createOrderFilters } from "../helpers";
import { useTranslation } from "react-i18next";
import useList from "../../../core/hooks/useList.ts";
import { OrderInterface } from "../interfaces/order.interface.ts";
import useDelete from "../../../core/hooks/api/useDelete.ts";
import { Url } from "../../../core/hooks/api/useApi.ts";
import { ORDER_QUERY_KEY } from "../contants/action.constants.ts";
import { Language } from "../../../core/enums/Language.ts";

const useOrderList = () => {
  const { t, i18n } = useTranslation();
  const [id, setId] = useState<Url | null>(null);

  const { query, handleFilter } = useList<OrderInterface>([ORDER_QUERY_KEY]);

  const { remove } = useDelete([ORDER_QUERY_KEY]);

  const currentPage = query?.data?.pagination?.page ?? 1;

  useEffect(() => {
    if (currentPage === 0) {
      handleFilter({ page: 1 });
    }
  }, [currentPage, handleFilter]);

  const handleCommentModal = useCallback(
    (id: Url) => {
      setId(id);
    },
    [remove, query],
  );

  const handleClose = useCallback(() => {
    setId(null);
    query.refetch();
  }, []);

  const columns = useMemo(
    () =>
      createOrderColumns(
        t,
        handleCommentModal,
        handleClose,
        i18n.language as Language,
      ),
    [t, handleCommentModal, i18n.language, handleClose],
  );

  const filters = useMemo(() => createOrderFilters(t), [t]);

  return {
    columns,
    dataSource: query?.data,
    filters,
    id,
    handleClose,
    handleFilter,
  };
};

export default useOrderList;
