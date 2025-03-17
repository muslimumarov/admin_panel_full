import { PartnerInterface } from "../interfaces/partner.interface.ts";
import { ColumnType } from "../../../core/components/moleculas/table/types/column.type.ts";
import { DATE_TIME } from "../../../core/constants/date.constants.ts";
import { dayjs } from "../../../core/utils/day.ts";
import { Tooltip } from "flowbite-react";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { Url } from "../../../core/hooks/api/useApi.ts";
import DeleteConfirm from "../../../core/components/atoms/confirm/DeleteConfirm.tsx";
import { Language } from "../../../core/enums/Language.ts";
import get from "lodash/get";

const createPartnerColumns = (
  t: (text: string) => string,
  handleDelete: (id: Url) => void,
  lang: Language,
): ColumnType<PartnerInterface>[] => [
  {
    key: "translations",
    dataIndex: `translations`,
    name: t("organizationName"),
    render: (translations, record) => (
      <a className={"underline"} href={record.url} target={"_blank"}>
        {get(translations, `${lang}.organization`)}
      </a>
    ),
  },
  {
    key: "logo",
    dataIndex: "logo",
    name: t("logo"),
    render: (logo) => (
      <img
        className={"max-h-24 min-w-40 max-w-44 object-contain"}
        src={`/${logo}`}
        alt={""}
      />
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

export default createPartnerColumns;
