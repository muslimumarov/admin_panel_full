import React, { useEffect } from "react";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Tooltip } from "flowbite-react";
import { ArrowRight } from "lucide-react";
import useMediaQuerySizes from "../../../core/hooks/useMediaQuerySizes.tsx";
import { EventsInterface } from "../interfaces/events.interface.ts";
import { EVENTS_QUERY_KEY } from "../contants/events.constants.ts";
import { dayjs } from "../../../core/utils/day.ts";
import { DATE_TIME } from "../../../core/constants/date.constants.ts";

const View: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sm } = useMediaQuerySizes();

  const query = useGetOne<EventsInterface>({
    id: `${id}`,
    url: [EVENTS_QUERY_KEY],
    options: { enabled: false },
  });

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
          <Tooltip content={t("back")}>
            <Button color={"light"} onClick={() => navigate(-1)}>
              {sm && t("back")} <ArrowRight size={20} />
            </Button>
          </Tooltip>
          <h1 className="text-left text-2xl font-bold  dark:text-white  mobil330:mb-14 mobil330:text-[19px]  sm:text-[24px]">
            {t("eventsAndNewsInfo")}
          </h1>
        </div>
        <div className=" grid-cols- grid gap-4">
          <strong className="pb-1 font-medium dark:text-white sm:pl-1">
            {t("ID")}: {""}
            <span className={"font-normal"}>{query.data?.id}</span>
          </strong>
          <strong className="pb-3 dark:text-white sm:pl-1">
            {t("reporter")}: {""}
            <span className={"font-normal"}> {query.data?.producer}</span>
          </strong>
          <strong className="pb-3 dark:text-white sm:pl-1">
            {t("address")}: {""}
            <span className={"font-normal"}> {query.data?.region}</span>
          </strong>
          <strong className="pb-3  dark:text-white sm:pl-1">
            {t("phone")}: {""}
            <span className={"font-normal"}> {query.data?.phone}</span>
          </strong>
          <strong className="pb-3  dark:text-white sm:pl-1">
            {t("Email")}: {""}
            <span className={"font-normal"}> {query.data?.email}</span>
          </strong>

          <strong> {t("incident_description")}:</strong>
          <div className="rounded-lg border p-4 dark:text-white ">
            {query.data?.description}
          </div>
          <div
            className="mb-[56px] grid rounded-lg border px-5 py-3 dark:border-gray-700 dark:text-white
    mobil330:grid-cols-1 mobil330:gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-6 lg:grid-cols-3 lg:gap-8"
          >
            <p>
              <strong className="dark:text-white">{t("incident_date")}:</strong>{" "}
              <br />
              <span className="dark:text-white">
                {query.data?.action_date &&
                  dayjs.utc(query.data.action_date).tz().format(DATE_TIME)}
              </span>
            </p>

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
