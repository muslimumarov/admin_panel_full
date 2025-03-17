import { ColumnType } from "../../../core/components/moleculas/table/types/column.type.ts";
import { DATE_TIME } from "../../../core/constants/date.constants.ts";
import { dayjs } from "../../../core/utils/day.ts";
import { Badge, Tooltip } from "flowbite-react";
import { Edit, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Url } from "../../../core/hooks/api/useApi.ts";
import { ServicesInterface } from "../interfaces/services.interface.ts";
import { ServicesStatus } from "../enums/ServicesStatus.ts";
import { Language } from "../../../core/enums/Language.ts";
import get from "lodash/get";
import DeleteConfirm from "../../../core/components/atoms/confirm/DeleteConfirm.tsx";
import { hasAccess } from "../../../core/utils/helpers.ts";
import { UserRole } from "../../user/enums/UserRole.ts";

const createServicesColumn = (
  t: (text: string) => string,
  handleDelete: (id: Url) => void,
  lang: Language,
): ColumnType<ServicesInterface>[] => [
  {
    key: "logo",
    dataIndex: "logo",
    name: t("logo"),
    render: (logo) => (
      <img
        className={"max-h-24 min-w-40 max-w-44 object-contain"}
        src={`/${logo}`}
        alt={"132"}
      />
    ),
  },
  {
    key: "title",
    dataIndex: "translations",
    name: t("title"),
    render: (translations) => get(translations, `${lang}.title`),
  },
  {
    key: "status",
    dataIndex: "status",
    name: t("status"),
    render: (status) => (
      <Badge
        className={"inline-block"}
        color={status === ServicesStatus.INACTIVE ? "dark" : "success"}
      >
        {status}
      </Badge>
    ),
  },
  {
    key: "contactInfo",
    dataIndex: "contactInfo",
    name: t("contact"),
  },
  {
    key: "updatedDate",
    dataIndex: "updatedAt",
    name: t("updatedAt"),
    render: (date) => dayjs(date).format(DATE_TIME),
  },

  {
    key: "createdDate",
    dataIndex: "createdAt",
    name: t("CreatedAt"),
    render: (date) => dayjs(date).format(DATE_TIME),
  },
  {
    key: "actions",
    dataIndex: "id",
    render: (id) => (
      <div
        className={"flex gap-3"}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <Tooltip content={t("view")}>
          <Link to={`view/${id}`}>
            <Eye size={18} />
          </Link>
        </Tooltip>
        {hasAccess([UserRole.CONTENT, UserRole.SUPER_ADMIN]) && (
          <Tooltip content={t("edit")}>
            <Link to={`edit/${id}`}>
              <Edit size={18} />
            </Link>
          </Tooltip>
        )}
        {hasAccess([UserRole.CONTENT, UserRole.SUPER_ADMIN]) && (
          <Tooltip content={t("delete")}>
            <DeleteConfirm onConfirm={() => handleDelete(id)} />
          </Tooltip>
        )}
      </div>
    ),
  },
];

export default createServicesColumn;
