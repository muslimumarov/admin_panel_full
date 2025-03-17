import React, { useEffect } from "react";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Language } from "../../../core/enums/Language.ts";
import { Button, Tooltip } from "flowbite-react";
import { ArrowRight } from "lucide-react";
import useMediaQuerySizes from "../../../core/hooks/useMediaQuerySizes.tsx";
import { RECOMMENDATION_QUERY_KEY } from "../constants/recommendation.constants.ts";
import { RecommendationInterface } from "../interfaces/recommendation.interface.ts";
import { dayjs } from "../../../core/utils/day.ts";
import { DATE_TIME } from "../../../core/constants/date.constants.ts";

const View: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sm } = useMediaQuerySizes();

  const query = useGetOne<RecommendationInterface>({
    id: `${id}`,
    url: [RECOMMENDATION_QUERY_KEY],
    options: { enabled: false },
  });

  const getLanguageName = (lang: string) => {
    switch (lang) {
      case "uz":
        return "O'zbekcha";
      case "ru":
        return "Русский";
      case "en":
        return "English";
      default:
        return lang;
    }
  };

  useEffect(() => {
    if (id) {
      query.refetch();
    }
  }, [id]);

  return (
    <>
      <div className="grid">
        <div className={"mt-3.5 flex flex-row-reverse justify-between"}>
          <Tooltip content={t("back")}>
            <Button color={"light"} onClick={() => navigate(-1)}>
              {sm && t("back")} <ArrowRight size={20} />
            </Button>
          </Tooltip>
          <h1 className="text-left text-2xl font-bold dark:text-white">
            {t("recommendationDetails")}
          </h1>
        </div>
        <div>
          <p className="pb-1 font-medium dark:text-white">
            {t("ID")}: {query.data?.id}
          </p>
          <p className="pb-3 font-medium dark:text-white">
            {t("category")}: {query.data?.category}
          </p>
          <img
            src={"/" + query.data?.image}
            alt="Image"
            className="mx-auto mb-10 max-w-[450px] rounded-[25px] border sm:max-w-[350px] md:max-w-[490px] lg:max-h-[440px]  lg:max-w-[540px]"
          />
          <div className="grid gap-6">
            {Object.values(Language).map((lang) => {
              const title = query.data?.translations[lang]?.text || "No title";
              const description =
                query.data?.translations[lang]?.description || "";

              return (
                <div
                  key={lang}
                  className="rounded-lg border p-4 dark:text-white"
                >
                  <strong>
                    {getLanguageName(lang)}: {title}
                  </strong>
                  <div
                    dangerouslySetInnerHTML={{ __html: description }}
                    className="max-h-40 overflow-auto rounded border p-2"
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-6 rounded-lg border p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="mb-5">
              <strong className="dark:text-white">{t("Tag")}:</strong> <br />
              {query.data?.tags?.join(", ")}
            </div>
            <div className="mb-5">
              <strong className="dark:text-white">{t("status")}:</strong> <br />
              {query.data?.status}
            </div>
            <div className="mb-5">
              <strong className="dark:text-white">{t("CreatedAt")}:</strong>{" "}
              <br />
              {query.data?.createdAt &&
                dayjs.utc(query.data.createdAt).tz().format(DATE_TIME)}
            </div>
            <div className="mb-5">
              <strong className="dark:text-white">{t("updatedAt")}:</strong>
              <br />
              {query.data?.updatedAt &&
                dayjs.utc(query.data.updatedAt).tz().format(DATE_TIME)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
