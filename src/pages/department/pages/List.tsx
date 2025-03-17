import useDepartmentList from "../hooks/useDepartmentList.ts";
import { useTranslation } from "react-i18next";
import { DepartmentInterface } from "../interfaces/department.interface.ts";
import { Button, Tooltip } from "flowbite-react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import useMediaQuerySizes from "../../../core/hooks/useMediaQuerySizes.tsx";
import { PageTitle } from "../../../core/components/atoms/title";
import { Search } from "../../../core/components/atoms/search";
import DataTable from "../../../core/components/moleculas/table/DataTable.tsx";

const List = () => {
  const { t } = useTranslation();
  const { dataSource, columns, handleFilter } = useDepartmentList();
  const { sm } = useMediaQuerySizes();

  return (
    <>
      <PageTitle title={t("department_name")} />
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

      <DataTable<DepartmentInterface>
        dataSource={dataSource}
        columns={columns}
        rowKey={"id"}
        hasNumbers
        onParamChange={handleFilter}
      />
    </>
  );
};

export default List;
