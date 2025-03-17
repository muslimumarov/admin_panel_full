import { OrderInterface } from "../interfaces/order.interface.ts";
import { ColumnType } from "../../../core/components/moleculas/table/types/column.type.ts";
import { Tooltip } from "flowbite-react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { DATE_TIME } from "../../../core/constants/date.constants.ts";
import { Link } from "react-router-dom";
import { Eye, MessageCircle } from "lucide-react";
import { Url } from "../../../core/hooks/api/useApi.ts";
import get from "lodash/get";
import { Language } from "../../../core/enums/Language.ts";
import StatusDropdown from "../components/StatusDorpdown.tsx";

dayjs.extend(utc);

const createOrderColumns = (
  t: (text: string) => string,
  handleCommentModal: (id: Url) => void,
  handleStatusChange: () => void,
  lang: Language,
): ColumnType<OrderInterface>[] => {
  return [
    {
      key: "id",
      dataIndex: "id",
      name: t("orderId"),
      render: (id) => (id ? id : "-"),
    },
    {
      key: "title",
      dataIndex: "translations",
      name: t("service_name"),
      render: (translations) => get(translations, `${lang}.title`),
    },

    {
      key: "status",
      dataIndex: "status",
      name: t("status"),
      render: (_status, record) => (
        <StatusDropdown item={record} onStatusChange={handleStatusChange} />
      ),
    },
    {
      key: "formCount",
      dataIndex: "schema",
      name: t("formCount"),
      render: (schema) => (Array.isArray(schema) ? schema.length : "-"),
    },
    {
      key: "comment",
      dataIndex: "comment",
      name: t("comment"),
      render: (comment) => {
        if (!comment) return "-";
        const plainText = comment.replace(/<\/?[^>]+(>|$)/g, "");
        return plainText.length > 100
          ? plainText.slice(0, 100) + "..."
          : plainText;
      },
    },
    {
      key: "createdAt",
      dataIndex: "createdAt",
      name: t("CreatedAt"),
      render: (date) => (date ? dayjs(date).utc().format(DATE_TIME) : "-"),
    },

    {
      key: "actions",
      dataIndex: "id",
      render: (id) => (
        <div
          className={"flex gap-5"}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <Tooltip content={t("view")}>
            <Link to={`view/${id}`}>
              <Eye size={18} />
            </Link>
          </Tooltip>
          <Tooltip content={t("edit")}>
            <MessageCircle size={18} onClick={() => handleCommentModal(id)} />
          </Tooltip>
        </div>
      ),
    },
  ];
};

export default createOrderColumns;
