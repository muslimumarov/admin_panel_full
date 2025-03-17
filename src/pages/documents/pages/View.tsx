import { FileCard } from "../../../core/components/moleculas/card";
import React, { useEffect } from "react";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Language } from "../../../core/enums/Language.ts";
import { Button, Tooltip } from "flowbite-react";
import { ArrowRight } from "lucide-react";
import useMediaQuerySizes from "../../../core/hooks/useMediaQuerySizes.tsx";
import { DOCUMENT_QUERY_KEY } from "../constants/documents.constants.ts";
import { DocumentsInterface } from "../interfaces/documents.interface.ts";
import { dayjs } from "../../../core/utils/day.ts";
import { DATE_TIME } from "../../../core/constants/date.constants.ts";

const View: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sm } = useMediaQuerySizes();

  const query = useGetOne<DocumentsInterface>({
    id: `${id}`,
    url: [DOCUMENT_QUERY_KEY],
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
          <Tooltip content={t("back")}>
            <Button color={"light"} onClick={() => navigate(-1)}>
              {sm && t("back")} <ArrowRight size={20} />
            </Button>
          </Tooltip>
          <h1 className="text-left text-2xl font-bold  dark:text-white  mobil330:mb-14 mobil330:text-[19px]  sm:text-[24px]">
            {t("documentDetails")}
          </h1>
        </div>
        <div className="">
          <p className="pb-1 font-medium dark:text-white sm:pl-1">
            {t("ID")}: {query.data?.id}
          </p>
          <p className="pb-3 font-medium dark:text-white sm:pl-1">
            {t("category")}: {query.data?.category}
          </p>
          <div className="whitespace-pre-wrap break-words border-none">
            {query.data?.files?.length ? (
              query.data.files.map((src) => {
                const fileName = src
                  .replace(/^uploads\//, "")
                  .replace(/\.[^/.]+$/, "")
                  .replace(/[½°·²_ ¸_ÂµÃÂ]/g, "");

                return (
                  <div key={src} className="">
                    <div className="mb-5 grid grid-cols-4 items-center gap-4 rounded-lg border p-2">
                      <span className="w-full rounded p-2 text-center dark:text-white">
                        {fileName}
                      </span>
                      <span className="w-full text-center font-medium dark:text-white">
                        {t("size")}: {query.data?.size}
                      </span>
                      <span className="w-full text-center font-medium dark:text-white">
                        {t("downloads")}: {query.data?.downloadCount}
                      </span>
                      <span className="flex w-full justify-center">
                        <FileCard src={src} />
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center">{t("fileNotFound")}</p>
            )}
          </div>

          {/*3 ta til*/}
          <div className="grid  w-full  grid-cols-1 gap-6  sm:mb-[22px] ">
            {Object.values(Language).map((lang) => {
              const title = query.data?.translations[lang]?.title || "No title";
              const description =
                query.data?.translations[lang]?.description || "";

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

                  <strong className=" my-2 block">{t("Description")}:</strong>
                  <div
                    className={`custom-scrollbar word-wrap max-h-[200px] overflow-y-auto overflow-x-hidden break-words rounded-md border p-2   dark:text-white`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: description }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="mb-[56px] grid justify-between rounded-lg border px-5
            py-2 dark:border-gray-700 dark:text-white mobil330:grid-cols-1
            mobil330:gap-[18px]  sm:grid-cols-3 sm:gap-[18px]
            md:grid-cols-5 md:gap-[23px] lg:grid-cols-5 lg:gap-4"
          >
            <p>
              <strong className="">{t("Tag")}:</strong>
              <br />
              <span className="dark:text-white">{query.data?.tags}</span>
            </p>
            <p>
              <strong className="">{t("Status")}:</strong>
              <br />
              <span className="dark:text-white">{query.data?.status}</span>
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
