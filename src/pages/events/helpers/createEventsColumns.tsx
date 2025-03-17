import { ColumnType } from "../../../core/components/moleculas/table/types/column.type.ts";

import { EventsInterface } from "../interfaces/events.interface.ts";
import { dayjs } from "../../../core/utils/day.ts";
import { DATE_TIME } from "../../../core/constants/date.constants.ts";
import { Tooltip } from "flowbite-react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import {
  EventsStatus,
  EventsStatusTranslation,
} from "../enums/EventsStatus.ts";

const createEventsColumns = (
  t: (text: string) => string,
): ColumnType<EventsInterface>[] => [
  {
    key: "producer",
    dataIndex: "producer",
    name: t("reporter"),
    render: (value: string) =>
      t(EventsStatusTranslation[value as EventsStatus]) || value,
  },
  {
    key: "fullname",
    dataIndex: "fullname",
    name: t("full_name"),
  },
  {
    key: "region",
    dataIndex: "region",
    name: t("address"),
  },
  {
    key: "phone",
    dataIndex: "phone",
    name: t("phone"),
  },
  {
    key: "description",
    dataIndex: "description",
    name: t("incident_description"),
    render: (text) => (text?.length > 100 ? text.slice(0, 100) + "..." : text),
  },

  {
    key: "action_date",
    dataIndex: "action_date",
    name: t("incident_date"),
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

export default createEventsColumns;
