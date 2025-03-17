import useOrderList from "../hooks/useOrderList.ts";
import { useTranslation } from "react-i18next";
import { OrderInterface } from "../interfaces/order.interface.ts";
import { PageTitle } from "../../../core/components/atoms/title";
import { Search } from "../../../core/components/atoms/search";
import { FilterWrapper } from "../../../core/components/moleculas/filter";
import DataTable from "../../../core/components/moleculas/table/DataTable.tsx";
import { CommentModal } from "../components/CommentModal.tsx";

const List = () => {
  const { t } = useTranslation();
  const { dataSource, columns, handleFilter, id, handleClose } = useOrderList();
  const { filters } = useOrderList();

  return (
    <>
      <CommentModal id={id} handleClose={handleClose} />
      <PageTitle title={t("orders")} />
      <div className={"mb-3 flex justify-between gap-2"}>
        <Search name={"text"} />
        <div className={"flex items-center justify-end gap-2"}>
          <FilterWrapper filters={filters} />
        </div>
      </div>

      <DataTable<OrderInterface>
        dataSource={dataSource}
        columns={columns}
        rowKey={"id"}
        onParamChange={handleFilter}
      />
    </>
  );
};

export default List;
