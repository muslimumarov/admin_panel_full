import { ArticlesInterface } from "../interfaces/articles.interface.ts";
import { ColumnType } from "../../../core/components/moleculas/table/types/column.type.ts";
import { DATE_TIME } from "../../../core/constants/date.constants.ts";
import { dayjs } from "../../../core/utils/day.ts";
import { Badge, Tooltip } from "flowbite-react";
import { ArticlesStatus } from "../enums/ArticlesStatus.ts";
import { Edit, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Url } from "../../../core/hooks/api/useApi.ts";
import DeleteConfirm from "../../../core/components/atoms/confirm/DeleteConfirm.tsx";
import { Language } from "../../../core/enums/Language.ts";
import get from "lodash/get";

const createArticlesColumns = (
  t: (text: string) => string,
  handleDelete: (id: Url) => void,
  lang: Language,
): ColumnType<ArticlesInterface>[] => [
  {
    key: "image",
    dataIndex: "image",
    name: t("poster"),
    render: (image: string) => (
      <img
        className="max-h-24 min-w-40 max-w-44 object-contain"
        src={`/${image}`}
        alt="Poster"
      />
    ),
  },
  {
    key: "title",
    dataIndex: "translations",
    name: t("title"),
    render: (translations: ArticlesInterface["translations"]) =>
      get(translations, `${lang}.title`, "unknownTitle"),
  },

  {
    key: "status",
    dataIndex: "status",
    name: t("status"),
    render: (status: ArticlesStatus) => (
      <Badge
        className="inline-block"
        color={status === ArticlesStatus.DRAFT ? "dark" : "success"}
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
    render: (id: number) => (
      <div className="flex gap-3" onClick={(event) => event.stopPropagation()}>
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

export default createArticlesColumns;
