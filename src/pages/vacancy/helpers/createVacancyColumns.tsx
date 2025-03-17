import { VacancyInterface } from "../interfaces/vacancy.interface.ts";
import { ColumnType } from "../../../core/components/moleculas/table/types/column.type.ts";
import { DATE_TIME } from "../../../core/constants/date.constants.ts";
import { dayjs } from "../../../core/utils/day.ts";
import { Badge, Tooltip } from "flowbite-react";
import { VacancyStatus } from "../enums/VacancyStatus.ts";
import { Edit, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Url } from "../../../core/hooks/api/useApi.ts";
import DeleteConfirm from "../../../core/components/atoms/confirm/DeleteConfirm.tsx";
import get from "lodash/get";
import { Language } from "../../../core/enums/Language.ts";

const createNewsColumn = (
  t: (text: string) => string,
  handleDelete: (id: Url) => void,
  lang: Language,
): ColumnType<VacancyInterface>[] => [
  {
    key: "id",
    dataIndex: "id",
    name: t("ID"),
    render: (id) => <span>{id}</span>,
  },
  {
    key: "title",
    dataIndex: "translations",
    name: t("title"),
    render: (translations) => get(translations, `${lang}.title`),
  },
  {
    key: "employmentType",
    dataIndex: "employmentType",
    name: t("employment_type"),
    render: (employmentType) => t(employmentType),
  },
  {
    key: "salary",
    dataIndex: "salary",
    name: t("salary"),
    render: (salary) => (salary ? `${salary} $` : "-"),
  },
  {
    key: "status",
    dataIndex: "status",
    name: t("status"),
    render: (status) => (
      <Badge
        className={"inline-block"}
        color={status === VacancyStatus.INACTIVE ? "dark" : "success"}
      >
        {status}
      </Badge>
    ),
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
        onClick={(event) => event.stopPropagation()}
      >
        <Tooltip content={t("view")}>
          <Link to={`view/${id}`}>
            <Eye size={18} />
          </Link>
        </Tooltip>
        <Tooltip content={t("edit")}>
          <Link to={`edit/${id}`}>
            <Edit size={18} />
          </Link>
        </Tooltip>
        <Tooltip content={t("delete")}>
          <DeleteConfirm onConfirm={() => handleDelete(id)} />
        </Tooltip>
      </div>
    ),
  },
];

export default createNewsColumn;
