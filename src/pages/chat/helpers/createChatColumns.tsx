import { ChatInterface } from "../interfaces/chat.interface.ts";
import { ColumnType } from "../../../core/components/moleculas/table/types/column.type.ts";
import { Tooltip } from "flowbite-react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { dayjs } from "../../../core/utils/day.ts";
import { DATE_TIME } from "../../../core/constants/date.constants.ts";

const createChatColumns = (
  t: (text: string) => string,
): ColumnType<ChatInterface>[] => [
  {
    key: "id",
    dataIndex: "id",
    name: t("ID"),
  },
  {
    key: "fullname",
    dataIndex: "fullname",
    name: t("name"),
  },
  {
    key: "email",
    dataIndex: "email",
    name: t("Email"),
  },
  {
    key: "phone",
    dataIndex: "phone",
    name: t("phone"),
  },
  {
    key: "messagesCount",
    dataIndex: "messagesCount",
    name: t("messagesCount"),
  },
  {
    key: "createdAt",
    dataIndex: "createdAt",
    name: t("createdAt"),
    render: (date) => dayjs(date).format(DATE_TIME),
  },
  {
    key: "updatedAt",
    dataIndex: "updatedAt",
    name: t("updatedAt"),
    render: (date) => dayjs(date).format(DATE_TIME),
  },
  {
    key: "actions",
    dataIndex: "id",
    render: (id) => (
      <div
        className={"flex gap-6"}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <Tooltip content={t("view")}>
          <Link to={`view/${id}`}>
            <Eye size={18} />
          </Link>
        </Tooltip>
      </div>
    ),
  },
];

export default createChatColumns;
