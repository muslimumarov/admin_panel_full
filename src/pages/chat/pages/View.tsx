import React, { useEffect } from "react";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Tooltip } from "flowbite-react";
import { ArrowRight } from "lucide-react";
import useMediaQuerySizes from "../../../core/hooks/useMediaQuerySizes.tsx";
import { ChatInterface } from "../interfaces/chat.interface.ts";
import dayjs from "dayjs";
import { DATE_TIME } from "../../../core/constants/date.constants.ts";

const View: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sm } = useMediaQuerySizes();

  const query = useGetOne<ChatInterface>({
    id: `${id}`,
    url: ["chat"],
    options: { enabled: false },
  });

  useEffect(() => {
    if (id) {
      query.refetch();
    }
  }, [id]);

  return (
    <div className="grid">
      {/* Header */}
      <div className="mt-3.5 flex flex-row-reverse justify-between">
        <Tooltip content={t("back")}>
          <Button color="light" onClick={() => navigate(-1)}>
            {sm && t("Back")} <ArrowRight size={20} />
          </Button>
        </Tooltip>
        <h1 className="text-left text-2xl font-bold dark:text-white">
          {t("chatInfo")}
        </h1>
      </div>

      {/* User Information Row */}
      <div className="mt-5 rounded-lg border bg-white p-4 shadow-md dark:bg-gray-900 dark:text-white">
        <div className="flex items-center justify-between font-medium text-gray-700 dark:text-gray-300">
          <span>{query.data?.fullname || "-"}</span>
          <span>{query.data?.email || "-"}</span>
          <span>{query.data?.phone || "-"}</span>
          <span>
            {query.data?.createdAt &&
              dayjs.utc(query.data.createdAt).tz().format(DATE_TIME)}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="mt-5">
        <h2 className="text-xl font-bold dark:text-white">{t("Messages")}</h2>
        <div className="mt-3 grid w-full gap-6">
          {query.data?.messages?.length ? (
            query.data.messages.map((msg) => (
              <div
                key={msg.id}
                className="rounded-lg border bg-white p-5 shadow-md transition-shadow hover:shadow-lg dark:bg-gray-900"
              >
                <strong className="mb-2 block text-lg text-purple-600 dark:text-purple-400">
                  {t("question")}: {msg.question}
                </strong>
                <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
                  <strong className="text-gray-800 dark:text-gray-300">
                    {msg.answer}
                  </strong>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  <strong>{t("Created At")}:</strong>{" "}
                  {query.data?.createdAt &&
                    dayjs.utc(query.data.createdAt).tz().format(DATE_TIME)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">{t("noMessagesFound")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default View;
