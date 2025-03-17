import React, { useEffect } from "react";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Language } from "../../../core/enums/Language.ts";
import { Button, Tooltip } from "flowbite-react";
import { ArrowRight } from "lucide-react";
import useMediaQuerySizes from "../../../core/hooks/useMediaQuerySizes.tsx";
import { VacancyInterface } from "../interfaces/vacancy.interface.ts";
import { VACANCY_QUERY_KEY } from "../constants/vacancy.constants.ts";
import { dayjs } from "../../../core/utils/day.ts";
import { DATE_TIME } from "../../../core/constants/date.constants.ts";

const View: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sm } = useMediaQuerySizes();

  const query = useGetOne<VacancyInterface>({
    id: `${id}`,
    url: [VACANCY_QUERY_KEY],
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
      {/*view page*/}
      <div className="grid">
        <div className={"mt-3.5 flex flex-row-reverse justify-between"}>
          <Tooltip content={t("Back")}>
            <Button color={"light"} onClick={() => navigate(-1)}>
              {sm && t("Back")} <ArrowRight size={20} />
            </Button>
          </Tooltip>
          <h1 className="text-left text-2xl font-bold  dark:text-white  mobil330:mb-4 mobil330:text-[19px]  sm:text-[24px]">
            {t("vacancyDetails")}
          </h1>
        </div>
        <div className="">
          <p className="pb-1 font-medium dark:text-white sm:pl-1">
            ID: {query.data?.id}
          </p>
          <p
            className={`pb-3 font-medium dark:text-white sm:pl-1 ${
              query.data?.status === "ACTIVE"
                ? "text-green-500"
                : query.data?.status === "INACTIVE"
                  ? "text-red-500"
                  : "text-gray-500"
            }`}
          >
            <strong className={"text-black"}> {t("status")}:</strong>{" "}
            {query.data?.status}
          </p>

          <p className="pb-3 font-bold dark:text-white sm:pl-1">
            {t("salary")}:
            <span className={"font-normal"}>
              {" "}
              {""}
              {query.data?.salary}
            </span>
          </p>
          {/*3 ta til*/}
          <div className="grid  w-full  grid-cols-1 gap-6  sm:mb-[22px] ">
            {Object.values(Language).map((lang) => {
              const title = query.data?.translations[lang]?.title || "No title";
              const location =
                query.data?.translations[lang]?.location || "No location";
              const requirements =
                query.data?.translations[lang]?.requirements ||
                "No requirements";
              const workConditions =
                query.data?.translations[lang]?.workConditions ||
                "No workConditions";
              const responsibilities =
                query.data?.translations[lang]?.responsibilities ||
                "No responsibilities";
              return (
                <div
                  key={lang}
                  className="rounded-lg border p-4 dark:text-white "
                >
                  <strong className=" mb-2 block">
                    <span className="mb-2 block text-fuchsia-500">
                      {getLanguageName(lang)}
                    </span>
                    {t("Title")}: <span className="font-normal">{title}</span>
                  </strong>

                  <strong className="my-2 flex items-center gap-1">
                    {t("location")}:{" "}
                    <span
                      className="font-normal"
                      dangerouslySetInnerHTML={{ __html: location }}
                    />
                  </strong>

                  <strong className="my-2 flex items-center gap-1">
                    {t("requirements")}:{" "}
                  </strong>
                  <span
                    className="font-normal"
                    dangerouslySetInnerHTML={{ __html: requirements }}
                  />

                  <strong className="my-2 flex items-center gap-1">
                    {t("work_conditions")}:{" "}
                  </strong>
                  <span
                    className="font-normal"
                    dangerouslySetInnerHTML={{ __html: workConditions }}
                  />
                  <strong className="my-2 flex items-center gap-1">
                    {t("responsibilities")}:{" "}
                  </strong>
                  <span
                    className="font-normal"
                    dangerouslySetInnerHTML={{ __html: responsibilities }}
                  />
                </div>
              );
            })}
          </div>

          <div
            className="mb-[56px] grid grid-cols-2 place-items-center rounded-lg border
            px-5 py-2 dark:border-gray-700
            dark:text-white  mobil330:mt-5 mobil330:gap-[18px]
            sm:gap-[18px] md:gap-[23px]  lg:gap-4"
          >
            <p>
              <strong className="dark:text-white">{t("CreatedAt")}:</strong>{" "}
              <br />
              <span className="dark:text-white">
                {query.data?.createdAt &&
                  dayjs.utc(query.data.createdAt).tz().format(DATE_TIME)}
              </span>
            </p>

            <p>
              <strong className="dark:text-white">{t("updatedAt")}:</strong>{" "}
              <br />
              <span className="dark:text-white">
                {query.data?.updatedAt &&
                  dayjs.utc(query.data.updatedAt).tz().format(DATE_TIME)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
