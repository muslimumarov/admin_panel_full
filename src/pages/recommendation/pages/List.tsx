import { FilterWrapper } from "../../../core/components/moleculas/filter";
import { PageTitle } from "../../../core/components/atoms/title";
import { useTranslation } from "react-i18next";
import DataTable from "../../../core/components/moleculas/table/DataTable.tsx";
import { Button, Tooltip } from "flowbite-react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { RecommendationInterface } from "../interfaces/recommendation.interface.ts";
import useMediaQuerySizes from "../../../core/hooks/useMediaQuerySizes.tsx";
import useRecommendationList from "../hooks/useRecommendationList.ts";
import { Search } from "../../../core/components/atoms/search";

const List = () => {
  const { t } = useTranslation();
  const { dataSource, columns, filters, handleFilter } =
    useRecommendationList();
  const { sm } = useMediaQuerySizes();
  return (
    <>
      <PageTitle title={t("recommendations")} />
      <div className={"mb-3 flex justify-between gap-2"}>
        <Search name={"text"} />
        <div className={"flex items-center justify-end gap-2"}>
          <FilterWrapper filters={filters} />

          <Tooltip content={t("add")}>
            <Button as={Link} to={"create"} color={"blue"}>
              <Plus size={20} /> {sm && t("add")}
            </Button>
          </Tooltip>
        </div>
      </div>

      <DataTable<RecommendationInterface>
        dataSource={dataSource}
        columns={columns}
        rowKey={"id"}
        onParamChange={handleFilter}
      />
    </>
  );
};

export default List;
