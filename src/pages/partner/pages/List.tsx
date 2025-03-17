import usePartnerList from "../hooks/usePartnerList.ts";
import { PageTitle } from "../../../core/components/atoms/title";
import { useTranslation } from "react-i18next";
import DataTable from "../../../core/components/moleculas/table/DataTable.tsx";
import { PartnerInterface } from "../interfaces/partner.interface.ts";
import { Button, Tooltip } from "flowbite-react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import useMediaQuerySizes from "../../../core/hooks/useMediaQuerySizes.tsx";
import { Search } from "../../../core/components/atoms/search";

const List = () => {
  const { t } = useTranslation();
  const { dataSource, columns, handleFilter } = usePartnerList();
  const { sm } = useMediaQuerySizes();

  return (
    <>
      <PageTitle title={t("partners")} />
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
      <DataTable<PartnerInterface>
        dataSource={dataSource}
        columns={columns}
        rowKey={"id"}
        onParamChange={handleFilter}
      />
    </>
  );
};
export default List;
