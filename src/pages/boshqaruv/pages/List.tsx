import useManagementList from "../hooks/useManagementList.ts";
import { PageTitle } from "../../../core/components/atoms/title";
import { useTranslation } from "react-i18next";
import DataTable from "../../../core/components/moleculas/table/DataTable.tsx";
import { ManagementInterface } from "../interfaces/management.interface.ts";
import { Button, Tooltip } from "flowbite-react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import useMediaQuerySizes from "../../../core/hooks/useMediaQuerySizes.tsx";
import { Search } from "../../../core/components/atoms/search";

const List = () => {
  const { t, i18n } = useTranslation();
  const { dataSource, columns, handleFilter } = useManagementList();
  const { sm } = useMediaQuerySizes();

  console.log(i18n.language);
  return (
    <>
      <PageTitle title={t("management")} />
      <div className={"mb-3 flex justify-between gap-2"}>
        <Search name={"text"} />
        <div className={"flex items-center justify-end gap-2"}>
          <Tooltip content={t("add")}>
            <Button as={Link} to={"create"} color={"blue"}>
              <Plus size={20} /> {sm && t("add")}
            </Button>
          </Tooltip>
        </div>
      </div>

      <DataTable<ManagementInterface>
        dataSource={dataSource}
        columns={columns}
        rowKey={"id"}
        onParamChange={handleFilter}
      />
    </>
  );
};

export default List;
