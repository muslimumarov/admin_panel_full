import PageTitle from "../../core/components/atoms/title/PageTitle.tsx";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import List from "../settings/pages/List.tsx";

const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container ">
      <span className="">
        {" "}
        <PageTitle title={t("Sozlamalar")} />
      </span>
      <div className="w-full">
        <List />
      </div>
      <div className=" min-h-full w-full rounded-lg bg-gray-50 p-3 dark:bg-transparent">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsPage;
