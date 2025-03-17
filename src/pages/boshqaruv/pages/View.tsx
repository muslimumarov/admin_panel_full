import React, { useEffect } from "react";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Language } from "../../../core/enums/Language.ts";
import { Button, Tooltip } from "flowbite-react";
import { ArrowRight } from "lucide-react";
import useMediaQuerySizes from "../../../core/hooks/useMediaQuerySizes.tsx";
import { MANAGEMENT_QUERY_KEY } from "../constants/management.constants.ts";
import { ManagementInterface } from "../interfaces/management.interface.ts";
import { dayjs } from "../../../core/utils/day.ts";
import { DATE_TIME } from "../../../core/constants/date.constants.ts";

const View: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sm } = useMediaQuerySizes();

  const query = useGetOne<ManagementInterface>({
    id: `${id}`,
    url: [MANAGEMENT_QUERY_KEY],
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
    <div className="grid gap-10 p-6">
      <div className="flex flex-row-reverse items-center justify-between">
        <Tooltip content={t("back")}>
          <Button color="light" onClick={() => navigate(-1)}>
            {sm && t("back")} <ArrowRight size={20} />
          </Button>
        </Tooltip>
        <h1 className="text-2xl font-bold dark:text-white">
          {t("leadershipInfo")}
        </h1>
      </div>

      {query.data?.avatar && (
        <div className="flex justify-center">
          <img
            src={"/" + query.data?.avatar}
            alt="Avatar"
            className="mx-auto mb-10 max-w-[450px] rounded-[25px] border sm:max-w-[350px] md:max-w-[490px] lg:max-h-[440px]  lg:max-w-[540px]"
          />
        </div>
      )}

      <div className="text-center dark:text-white">
        <h2 className="text-xl font-semibold">
          {query.data?.translations.uz?.fullname}
        </h2>
        <p>{query.data?.position?.translations.uz?.title}</p>
        <p className="text-sm text-gray-400">
          {query.data?.department?.translations.uz?.title}
        </p>
        {query.data?.section?.translations.uz?.title && (
          <p className="text-sm text-gray-400">
            {t("section")}: {query.data?.section?.translations.uz?.title}
          </p>
        )}
      </div>

      <div className="grid gap-6">
        {Object.values(Language).map((lang) => {
          const fullname =
            query.data?.translations[lang]?.fullname || t("noName");
          const tasks = query.data?.translations[lang]?.tasks
            ? `<strong>${t("tasks")}</strong>: ${query.data.translations[lang]?.tasks}`
            : `<strong>${t("tasks")}</strong>: ${t("noTasks")}`;
          const acceptance = query.data?.translations[lang]?.acceptance
            ? `<strong>${t("reception_time")}</strong>: ${query.data.translations[lang]?.acceptance}`
            : `<strong>${t("reception_time")}</strong>: ${t("noAppointmentTime")}`;

          return (
            <div
              key={lang}
              className="rounded-lg border p-6 shadow-md dark:bg-gray-800"
            >
              <h3 className="mb-2 text-lg font-bold">
                {getLanguageName(lang)}
              </h3>
              <p className="font-semibold">{fullname}</p>
              <div
                className="mt-2 max-h-40 overflow-auto rounded border p-2"
                dangerouslySetInnerHTML={{ __html: tasks }}
              />
              <div
                className="mt-2 max-h-40 overflow-auto rounded border p-2"
                dangerouslySetInnerHTML={{ __html: acceptance }}
              />
            </div>
          );
        })}
      </div>

      <div className=" dark:text-white">
        <p>
          <strong>{t("Email")}:</strong> {query.data?.email}
        </p>
        <p>
          <strong>{t("phone")}:</strong> {query.data?.phone}
        </p>
        <p className={"flex items-center"}>
          <strong className="">{t("CreatedAt")}:</strong> <br />
          <span className="">
            {query.data?.createdAt &&
              dayjs.utc(query.data.createdAt).tz().format(DATE_TIME)}
          </span>
        </p>
        <p className={"flex items-center "}>
          <strong className="">{t("updatedAt")}:</strong> <br />
          <span className="">
            {query.data?.updatedAt &&
              dayjs.utc(query.data.updatedAt).tz().format(DATE_TIME)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default View;
