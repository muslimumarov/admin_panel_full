import { FileCard } from "../../../core/components/moleculas/card";
import React, { useEffect } from "react";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Language } from "../../../core/enums/Language.ts";
import { Button, Tooltip } from "flowbite-react";
import { ArrowRight } from "lucide-react";
import useMediaQuerySizes from "../../../core/hooks/useMediaQuerySizes.tsx";
import { SERVICES_QUERY_KEY } from "../constants/services.constants.ts";
import { ServicesInterface } from "../interfaces/services.interface.ts";
import { dayjs } from "../../../core/utils/day.ts";
import { DATE_TIME } from "../../../core/constants/date.constants.ts";

const View: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sm } = useMediaQuerySizes();

  const query = useGetOne<ServicesInterface>({
    id: `${id}`,
    url: [SERVICES_QUERY_KEY],
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
    <div className="grid">
      <div className="mt-3.5 flex flex-row-reverse justify-between">
        <Tooltip content={t("Back")}>
          <Button color="light" onClick={() => navigate(-1)}>
            {sm && t("Back")} <ArrowRight size={20} />
          </Button>
        </Tooltip>
        <h1 className="text-2xl font-bold dark:text-white">
          {t("serviceDetails")}
        </h1>
      </div>

      <div>
        <p className="pb-1 font-medium dark:text-white">
          <span className={"font-bold"}>ID</span>: {query.data?.id}
        </p>
        <p className="pb-3 font-medium dark:text-white">
          <span className={"font-bold"}> {t("category")}</span>:{" "}
          {query.data?.category}
        </p>
      </div>

      <img
        src={"/" + query.data?.logo}
        alt="Image"
        className="mx-auto mb-10 max-w-[450px] rounded-[25px] border sm:max-w-[350px] md:max-w-[490px] lg:max-h-[440px]  lg:max-w-[540px]"
      />

      {query.data?.documents?.length ? (
        query.data.documents.map((src) => (
          <div key={src} className="mb-4">
            <FileCard src={src} />
          </div>
        ))
      ) : (
        <p>{t("NoName")}</p>
      )}

      <div className="grid gap-6">
        {Object.values(Language).map((lang) => {
          const title = query.data?.translations[lang]?.title || t("NoName");
          const description =
            query.data?.translations[lang]?.description || t("NoName");
          return (
            <div key={lang} className="rounded-lg border p-4 dark:bg-gray-800">
              <h3 className="font-bold">{getLanguageName(lang)}</h3>
              <p>
                {t("title")}: {title}
              </p>
              <div
                className="mt-2 max-h-40 overflow-auto rounded border p-2"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          );
        })}
      </div>

      <div
        className="mb-[56px] mt-5 grid justify-between rounded-lg border
            px-5 py-2 dark:border-gray-700 mobil330:grid-cols-1
            mobil330:gap-[18px]  sm:grid-cols-3 sm:gap-[18px]
            md:grid-cols-5 md:gap-[23px] lg:grid-cols-5 lg:gap-4"
      >
        <p>
          <strong>{t("Tag")}:</strong> {query.data?.tags?.join(", ")}
        </p>
        <p>
          <strong>{t("Status")}:</strong> {query.data?.status}
        </p>
        <p className={"flex items-center"}>
          <strong className="">{t("CreatedAt")}:</strong> <br />
          <span>
            {" "}
            {query.data?.createdAt &&
              dayjs.utc(query.data.createdAt).tz().format(DATE_TIME)}
          </span>
        </p>
        <p className={"flex items-center "}>
          <strong className="">{t("updatedAt")}:</strong> <br />
          <span>
            {query.data?.updatedAt &&
              dayjs.utc(query.data.updatedAt).tz().format(DATE_TIME)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default View;
