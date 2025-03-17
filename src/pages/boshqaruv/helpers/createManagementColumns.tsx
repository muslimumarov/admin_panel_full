import { ManagementInterface } from "../interfaces/management.interface.ts";
import { ColumnType } from "../../../core/components/moleculas/table/types/column.type.ts";
import { DATE_TIME } from "../../../core/constants/date.constants.ts";
import { dayjs } from "../../../core/utils/day.ts";
import { Tooltip } from "flowbite-react";
import { Edit, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Url } from "../../../core/hooks/api/useApi.ts";
import DeleteConfirm from "../../../core/components/atoms/confirm/DeleteConfirm.tsx";
import { Language } from "../../../core/enums/Language.ts";
import get from "lodash/get";

const createNewsColumn = (
  t: (text: string) => string,
  handleDelete: (id: Url) => void,
  lang: Language,
): ColumnType<ManagementInterface>[] => [
  {
    key: "avatar",
    dataIndex: "avatar",
    name: t("avatar"),
    render: (image) => (
      <img
        className={"max-h-24 min-w-20 max-w-44 object-contain"}
        src={`/${image}`}
        alt={""}
      />
    ),
  },
  {
    key: "fullname",
    dataIndex: `translations`,
    name: t("full_name"),
    render: (translations) => get(translations, `${lang}.fullname`),
  },
  {
    key: "department",
    dataIndex: "department",
    name: t("department_name"),
    render: (department) => get(department, `translations.${lang}.title`),
  },
  {
    key: "section",
    dataIndex: "section",
    name: t("sections"),
    render: (section) => get(section, `translations.${lang}.title`),
  },
  {
    key: "position",
    dataIndex: "position",
    name: t("positions"),
    render: (position) => get(position, `translations.${lang}.title`),
  },
  {
    key: "phone",
    dataIndex: "phone",
    name: t("phone"),
  },
  {
    key: "email",
    dataIndex: "email",
    name: t("Email"),
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
