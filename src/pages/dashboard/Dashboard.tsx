import { useDashboardData } from "./hooks/useDashboard.tsx";
import Cards from "./components/Card.tsx";
import OrderChart from "./components/OrderChart.tsx";
import HttpTracesTable from "./components/HttpTracer.tsx";
import ResponseOverview from "./components/ActionChart.tsx";

const Dashboard = () => {
  const { data } = useDashboardData();
  return (
    <div className="space-y-6 p-6">
      <Cards data={data} />
      <div
        className={
          "grid items-center  gap-6 dark:text-white md:grid-cols-1 xl:grid-cols-2"
        }
      >
        <ResponseOverview data={data} />
        <OrderChart />
      </div>
      <HttpTracesTable />
    </div>
  );
};

export default Dashboard;
