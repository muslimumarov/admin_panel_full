import React, { useEffect } from "react";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { NewsInterface } from "../interfaces/news.interface.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Language } from "../../../core/enums/Language.ts";
import { Button, Tooltip } from "flowbite-react";
import { ArrowRight } from "lucide-react";
import useMediaQuerySizes from "../../../core/hooks/useMediaQuerySizes.tsx";
import { dayjs } from "../../../core/utils/day.ts";
import { DATE_TIME } from "../../../core/constants/date.constants.ts";

const View: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sm } = useMediaQuerySizes();

  const query = useGetOne<NewsInterface>({
    id: `${id}`,
    url: ["news"],
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
          {/*sarlavha*/}
          <h1 className="text-left text-2xl font-bold dark:text-white  mobil330:mb-14 mobil330:text-[19px]  sm:text-[24px]">
            {t("newsDetails")}
          </h1>
        </div>
        <div className="">
          {/*image*/}
          <img
            src={"/" + query.data?.image}
            alt="Image"
            className="mx-auto mb-10 max-w-[350px] rounded-[25px] border sm:max-w-[350px] md:max-w-[490px]  lg:max-w-[440px] "
          />
          {/*3 ta til*/}
          <div className="grid  w-full  grid-cols-1 gap-6  mobil330:mb-[22px] ">
            {Object.values(Language).map((lang) => {
              const title = query.data?.translations[lang]?.title || "No title";
              const content = query.data?.translations[lang]?.content || "";

              return (
                <div
                  key={lang}
                  className="rounded-lg border p-4 dark:text-white "
                >
                  <strong className=" mb-2 block">
                    <span className="mb-2 block text-fuchsia-500 ">
                      {getLanguageName(lang)}
                    </span>
                    {t("Title")}: <span className="font-normal ">{title}</span>
                  </strong>

                  <strong className=" my-2 block">{t("Description")}:</strong>
                  <div
                    className={`custom-scrollbar word-wrap max-h-[200px] overflow-y-auto  overflow-x-hidden break-words rounded-md border p-2   dark:text-white`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: content }} />
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
              <span className="">{query.data?.tags}</span>
            </p>
            <p>
              <strong className="">{t("Status")}:</strong>
              <br />
              <span className="">{query.data?.status}</span>
            </p>
            <p>
              <strong className="">{t("createdAt")}:</strong> <br />
              <span className="">
                {query.data?.updatedAt &&
                  dayjs.utc(query.data.updatedAt).tz().format(DATE_TIME)}
              </span>
            </p>

            <p>
              <strong className="">{t("updatedAt")}:</strong> <br />
              <span className="">
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
