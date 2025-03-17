import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card } from "flowbite-react";
import dayjs from "dayjs";
import {
  DashboardInterface,
  ActionStats,
  ActionPerDayInterface,
  ActionRegionInterface,
  ActionTypeInterface,
} from "../interface/dashboard.interface";
import { MySelect } from "../../../core/components/atoms/form";
import { DATE_TIME } from "../../../core/constants/date.constants.ts";
import { useTranslation } from "react-i18next";

interface ResponseOverviewProps {
  data?: DashboardInterface;
}

const ResponseOverview: React.FC<ResponseOverviewProps> = ({ data }) => {
  const { t } = useTranslation();

  const chartOptions = [
    {
      key: "perDay",
      label: t("dailyStatistics"),
      type: "bar",
      nameKey: "date",
    },
    {
      key: "region",
      label: t("regionalStatistics"),
      type: "pie",
      nameKey: "region",
    },
    {
      key: "type",
      label: t("categoryStatistics"),
      type: "bar",
      nameKey: "type",
    },
  ];

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#ff6384",
    "#36a2eb",
    "#cc65fe",
    "#ffce56",
  ];

  const [selectedOption, setSelectedOption] = useState<
    (typeof chartOptions)[number]
  >(chartOptions[0]);

  if (!data || !data.action) return <p>{t("loading...")}</p>;

  const actionData: Record<keyof ActionStats, ActionStats[keyof ActionStats]> =
    data.action;
  const currentData = actionData[selectedOption.key as keyof ActionStats] as (
    | ActionPerDayInterface
    | ActionRegionInterface
    | ActionTypeInterface
  )[];

  const total = currentData.reduce((sum, item) => sum + item.count, 0);

  const chartData = currentData.map((item) => ({
    ...item,
    [selectedOption.nameKey]:
      selectedOption.key === "perDay"
        ? dayjs((item as ActionPerDayInterface).date).format(DATE_TIME)
        : item[selectedOption.nameKey as keyof typeof item],
    percentage: ((item.count / total) * 100).toFixed(2) + "%",
  }));

  return (
    <Card className="p-4 shadow-md">
      <h3 className="mb-4 text-lg font-semibold">{t("incident")}</h3>
      <MySelect
        name="chartType"
        options={chartOptions.map(({ key, label }) => ({ value: key, label }))}
        value={selectedOption.key}
        onChange={(e) => {
          const option = chartOptions.find((opt) => opt.key === e.target.value);
          if (option) setSelectedOption(option);
        }}
        className="mb-4"
      />
      {selectedOption.type === "bar" ? (
        <BarChart width={400} height={260} data={chartData}>
          <XAxis dataKey={selectedOption.nameKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" label={{ position: "top" }} />
        </BarChart>
      ) : (
        <div className="flex items-center dark:text-white">
          <PieChart width={400} height={250}>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey={selectedOption.nameKey}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ percent }) => `${(percent * 100).toFixed(2)}%`}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div className="ml-6">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="size-4 rounded"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span>
                  {item[selectedOption.nameKey as keyof typeof item]} (
                  {item.percentage})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default ResponseOverview;
