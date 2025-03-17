import { ColumnType } from "../../../core/components/moleculas/table/types/column.type.ts";
import { DATE_TIME } from "../../../core/constants/date.constants.ts";
import { dayjs } from "../../../core/utils/day.ts";
import { Tooltip } from "flowbite-react";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { Url } from "../../../core/hooks/api/useApi.ts";
import { Language } from "../../../core/enums/Language.ts";
import get from "lodash/get";
import DeleteConfirm from "../../../core/components/atoms/confirm/DeleteConfirm.tsx";
import { PositionInterface } from "../interfaces/position.interface.ts";

const createPositionColumns = (
  t: (text: string) => string,
  handleDelete: (id: Url) => void,
): ColumnType<PositionInterface>[] => [
  {
    key: "title_uz",
    dataIndex: "translations",
    name: `${t("name")} (uz)`,
    render: (translations) => get(translations, `${Language.UZ}.title`),
  },
  {
    key: "title_ru",
    dataIndex: "translations",
    name: `${t("name")} (ru)`,
    render: (translations) => get(translations, `${Language.RU}.title`),
  },
  {
    key: "title_en",
    dataIndex: "translations",
    name: `${t("name")} (en)`,
    render: (translations) => get(translations, `${Language.EN}.title`),
  },
  {
    key: "updatedAt",
    dataIndex: "updatedAt",
    name: t("updatedTime"),
    render: (date) => dayjs(date).format(DATE_TIME),
  },
  {
    key: "actions",
    dataIndex: "id",
    render: (id) => (
      <div className="flex gap-2">
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

export default createPositionColumns;
