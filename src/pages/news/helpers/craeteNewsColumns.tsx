import { NewsInterface } from "../interfaces/news.interface.ts";
import { ColumnType } from "../../../core/components/moleculas/table/types/column.type.ts";
import { DATE_TIME } from "../../../core/constants/date.constants.ts";
import { dayjs } from "../../../core/utils/day.ts";
import { Badge, Tooltip } from "flowbite-react";
import { NewsStatus } from "../enums/NewsStatus.ts";
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
): ColumnType<NewsInterface>[] => [
  {
    key: "image",
    dataIndex: "image",
    name: t("Poster"),
    render: (image) => (
      <img
        className={"max-h-24 min-w-40 max-w-44 object-contain"}
        src={`/${image}`}
        alt={""}
      />
    ),
  },
  {
    key: "title",
    dataIndex: `translations`,
    name: t("title"),
    render: (translations) => get(translations, `${lang}.title`),
  },

  {
    key: "category",
    dataIndex: "newsCategory",
    name: t("category"),
    render: (category) => get(category, `translations.${lang}.title`),
  },
  {
    key: "status",
    dataIndex: "status",
    name: t("Status"),
    render: (status) => (
      <Badge
        className={"inline-block"}
        color={status === NewsStatus.DRAFT ? "dark" : "success"}
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
