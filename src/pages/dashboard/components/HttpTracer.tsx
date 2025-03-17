import { useState } from "react";
import DataTable from "../../../core/components/moleculas/table/DataTable.tsx";
import { useDashboardData } from "../hooks/useDashboard.tsx";
import { ColumnType } from "../../../core/components/moleculas/table/types/column.type.ts";
import { TrackerData } from "../interface/dashboard.interface.ts";
import { FilterProps } from "../../../core/components/moleculas/table/DataTable.tsx";
import { useTranslation } from "react-i18next";

const HttpTracesTable: React.FC = () => {
  const { t } = useTranslation();

  const columns: ColumnType<TrackerData>[] = [
    {
      key: "createdAt",
      name: t("time"),
      dataIndex: "createdAt",
      render: (value) => new Date(value).toLocaleString(),
    },
    { key: "role", name: t("role"), dataIndex: "role" },
    { key: "email", name: t("Email"), dataIndex: "email" },
    { key: "method", name: t("method"), dataIndex: "method" },
    {
      key: "status",
      name: t("status"),
      dataIndex: "status",
      render: (value) => (
        <span
          className={
            value === 200
              ? "text-green-600"
              : value === 404
                ? "text-yellow-600"
                : value === 400
                  ? "text-blue-600"
                  : "text-red-600"
          }
        >
          {value}
        </span>
      ),
    },
    { key: "url", name: t("uri"), dataIndex: "url" },
  ];

  const [params, setParams] = useState<FilterProps<TrackerData>>({
    page: 1,
    limit: 10,
  });

  const { data } = useDashboardData(params);

  return (
    <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
      <h3 className="mb-4 text-lg font-semibold dark:text-white">
        {t("recentActions")}
      </h3>
      <DataTable<TrackerData>
        dataSource={data?.tracker}
        columns={columns}
        rowKey="createdAt"
        hasNumbers
        onParamChange={setParams}
      />
    </div>
  );
};

export default HttpTracesTable;
