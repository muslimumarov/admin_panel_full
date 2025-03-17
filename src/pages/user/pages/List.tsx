import useUserList from "../hooks/useUserList.ts";
import { PageTitle } from "../../../core/components/atoms/title";
import { useTranslation } from "react-i18next";
import DataTable from "../../../core/components/moleculas/table/DataTable.tsx";
import { UserInterface } from "../interfaces/user.interface.ts";
import { Button, Tooltip } from "flowbite-react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import useMediaQuerySizes from "../../../core/hooks/useMediaQuerySizes.tsx";
import { Search } from "../../../core/components/atoms/search";

const List = () => {
  const { t } = useTranslation();
  const { dataSource, columns, handleFilter } = useUserList();
  const { sm } = useMediaQuerySizes();

  return (
    <>
      <PageTitle title={t("systemUsers")} />
      <div className={"mb-3 flex justify-between gap-2"}>
        <Search name={"text"} />
        <div className={"flex items-center justify-end gap-2"}>
          <Tooltip content={t("view")}>
            <Button as={Link} to={"create"} color={"blue"}>
              <Plus size={20} /> {sm && t("add")}
            </Button>
          </Tooltip>
        </div>
      </div>
      <DataTable<UserInterface>
        dataSource={dataSource}
        columns={columns}
        rowKey={"id"}
        onParamChange={handleFilter}
      />
    </>
  );
};
export default List;
