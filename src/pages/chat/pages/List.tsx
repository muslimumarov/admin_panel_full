import useChatList from "../hooks/useChatList.ts";
import { useTranslation } from "react-i18next";
import { ChatInterface } from "../interfaces/chat.interface.ts";
import { PageTitle } from "../../../core/components/atoms/title";
import { Search } from "../../../core/components/atoms/search";
import DataTable from "../../../core/components/moleculas/table/DataTable.tsx";

const List = () => {
  const { t } = useTranslation();
  const { dataSource, columns, handleFilter, handleRowClick } = useChatList();

  return (
    <>
      <PageTitle title={t("chat")} />
      <div className={"mb-3 flex justify-between gap-2"}>
        <Search />
        <div className={"flex items-center justify-end gap-2"}></div>
      </div>

      <DataTable<ChatInterface>
        dataSource={dataSource}
        columns={columns}
        rowKey={"id"}
        onRowClick={handleRowClick}
        onParamChange={handleFilter}
      />
    </>
  );
};

export default List;
