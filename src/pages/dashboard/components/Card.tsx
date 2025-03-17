import { Card } from "flowbite-react";
import { DashboardInterface } from "../interface/dashboard.interface";
import { FileText, Newspaper, FileStack, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface StatCardsProps {
  data?: DashboardInterface;
}

const StatCards = ({ data }: StatCardsProps) => {
  const { t } = useTranslation();

  const statsConfig = [
    { key: "articles", label: t("articles"), icon: FileText },
    { key: "news", label: t("news"), icon: Newspaper },
    { key: "document", label: t("document"), icon: FileStack },
    { key: "recommendations", label: t("recommendations"), icon: CheckCircle },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 dark:text-gray-100 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
      {statsConfig.map(({ key, label, icon: Icon }) => {
        const item = data?.[key as keyof DashboardInterface];

        const value = (() => {
          if (typeof item === "object" && item !== null) {
            if ("total" in item) return item.total;
            if (Array.isArray(item)) return item.length;
            return "N/A";
          }
          return item ?? 0;
        })();

        const { published = 0, draft = 0 } =
          (item as unknown as { published?: number; draft?: number }) || {};

        return (
          <Card
            key={key}
            className={"" + "relative flex flex-col flex-wrap items-start "}
          >
            <div className="absolute  right-7 top-10 text-right">
              <h2 className="mb-1   text-2xl ">{label}</h2>
              <p className="text-3xl font-medium">{value}</p>
            </div>
            <Icon className="mb-6 size-12  text-gray-500 dark:text-gray-400 xl:size-8" />
            <div className="mt-auto text-sm">
              <p className="text-green-600">
                {t("published")}: {published}
              </p>
              <p className="text-red-600">
                {t("unpublished")}: {draft}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default StatCards;
