import { FilterWrapper } from "../../../core/components/moleculas/filter";
import { PageTitle } from "../../../core/components/atoms/title";
import { useTranslation } from "react-i18next";
import DataTable from "../../../core/components/moleculas/table/DataTable.tsx";
import { EventsInterface } from "../interfaces/events.interface.ts";
import { Search } from "../../../core/components/atoms/search";
import useEventsList from "../hooks/useEventsList.ts";

const List = () => {
  const { t } = useTranslation();
  const { dataSource, columns, filters, handleFilter } = useEventsList();

  return (
    <>
      <PageTitle title={t("eventsAndNews")} />
      <div className={"mb-3 flex justify-between gap-2"}>
        <Search name={"text"} />
        <div className={"flex items-center justify-end gap-2"}>
          <FilterWrapper filters={filters} />
        </div>
      </div>

      <DataTable<EventsInterface>
        dataSource={dataSource}
        columns={columns}
        rowKey={"id"}
        onParamChange={handleFilter}
      />
    </>
  );
};

export default List;
