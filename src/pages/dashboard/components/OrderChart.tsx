import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card } from "flowbite-react";
import { useDashboardData } from "../hooks/useDashboard.tsx";
import { useTranslation } from "react-i18next";

const STATUS_COLORS: Record<string, string> = {
  completed: "#22c55e",
  in_progress: "#facc15",
  pending: "#3b82f6",
  canceled: "#ef4444",
};

const OrderChart: React.FC = () => {
  const { data } = useDashboardData();
  const { t } = useTranslation();

  const STATUS_LABELS: Record<string, string> = {
    completed: t("completed"),
    in_progress: t("inProgress"),
    pending: t("Pending"),
    canceled: t("canceled"),
  };

  if (!data || !data.order) {
    return <p>{t("loading")}</p>;
  }

  const orderStats = data?.order?.status || [];

  if (!Array.isArray(orderStats) || orderStats.length === 0) {
    console.error("orderStats is not an array yoki bo‘sh:", orderStats);
    return <p>{t("noOrders")}</p>;
  }

  const totalOrders = orderStats.reduce(
    (sum, item) => sum + (item.count || 0),
    0,
  );
  const chartData =
    totalOrders > 0
      ? orderStats.map((item) => ({
          ...item,
          percentage: ((item.count / totalOrders) * 100).toFixed(2) + "%",
        }))
      : [];

  return (
    <Card className="  shadow-md">
      <h3 className=" text-lg font-semibold ">{t("orderStatus")}</h3>
      {chartData.length > 0 ? (
        <>
          <div className=" grid  grid-cols-2  items-center justify-items-center mobil330:grid-cols-1">
            <PieChart width={500} height={300} className="">
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ percent }) => `${(percent * 100).toFixed(2)}%`}
              >
                {chartData.map((item, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={STATUS_COLORS[item.status] || "#a855f7"}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} ${t("orders")}`]} />
            </PieChart>
            <div className="grid gap-4 sm:grid-cols-2">
              {chartData.map((item, index) => (
                <div key={index} className="mb-4 flex items-center gap-2">
                  <span
                    className="size-4 rounded"
                    style={{
                      backgroundColor: STATUS_COLORS[item.status] || "#a855f7",
                    }}
                  ></span>
                  <span className="text-sm font-medium">
                    {STATUS_LABELS[item.status]} ({item.percentage})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>{t("noOrders")}</p>
      )}
    </Card>
  );
};

export default OrderChart;
