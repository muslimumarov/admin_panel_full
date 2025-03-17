import { ColumnType } from "../../../core/components/moleculas/table/types/column.type.ts";
import { RecommendationInterface } from "../interfaces/recommendation.interface.ts";
import { Url } from "../../../core/hooks/api/useApi.ts";
import { Badge, Tooltip } from "flowbite-react";
import { dayjs } from "../../../core/utils/day.ts";
import { DATE_TIME } from "../../../core/constants/date.constants.ts";
import { Link } from "react-router-dom";
import { Edit, Eye } from "lucide-react";
import { RecommendationStatus } from "../enums/RecommendationStatus.ts";
import DeleteConfirm from "../../../core/components/atoms/confirm/DeleteConfirm.tsx";
import get from "lodash/get";
import { Language } from "../../../core/enums/Language.ts";

const createRecommendationColumn = (
  t: (text: string) => string,
  handleDelete: (id: Url) => void,
  lang: Language,
): ColumnType<RecommendationInterface>[] => [
  {
    key: "image",
    dataIndex: "image",
    name: t("logo"),
    render: (image) => (
      <img
        className="max-h-20 min-w-20 max-w-20 object-contain"
        src={`/${image}`}
        alt={"132"}
      />
    ),
  },
  {
    key: "title",
    dataIndex: `translations`,
    name: t("title"),
    render: (translations) => get(translations, `${lang}.text`),
  },

  {
    key: "category",
    dataIndex: "category",
    name: t("category"),
  },
  {
    key: "status",
    dataIndex: "status",
    name: t("status"),
    render: (status) => (
      <Badge
        className={"inline-block"}
        color={status === RecommendationStatus.INACTIVE ? "dark" : "success"}
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
    key: "createdAt",
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

export default createRecommendationColumn;
