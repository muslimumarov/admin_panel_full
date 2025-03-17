import { useCallback, useMemo } from "react";
import { createArticlesColumn, createEventsFilters } from "../helpers";
import { useTranslation } from "react-i18next";
import useList from "../../../core/hooks/useList.ts";
import { EventsInterface } from "../interfaces/events.interface.ts";
import useDelete from "../../../core/hooks/api/useDelete.ts";
import { Url } from "../../../core/hooks/api/useApi.ts";
import { EVENTS_QUERY_KEY } from "../contants/events.constants.ts";

const useEventsList = () => {
  const { t } = useTranslation();

  const { query, handleFilter } = useList<EventsInterface>([EVENTS_QUERY_KEY]);
  const { remove } = useDelete([EVENTS_QUERY_KEY]);

  const handleDelete = useCallback(
    (id: Url) => {
      remove(id).then(() => {
        query.refetch();
      });
    },
    [remove],
  );

  const columns = useMemo(
    () => createArticlesColumn(t), //handleDelete
    [t, handleDelete],
  );
  const filters = useMemo(() => createEventsFilters(t), [t]);

  return {
    columns,
    dataSource: query.data,
    filters,
    handleFilter,
  };
};

export default useEventsList;
