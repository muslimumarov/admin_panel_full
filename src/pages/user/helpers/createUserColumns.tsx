import { UserInterface } from "../interfaces/user.interface.ts";
import { ColumnType } from "../../../core/components/moleculas/table/types/column.type.ts";
import { Badge, Tooltip } from "flowbite-react";
import { UserRole } from "../enums/UserRole.ts";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { Url } from "../../../core/hooks/api/useApi.ts";
import DeleteConfirm from "../../../core/components/atoms/confirm/DeleteConfirm.tsx";

const createUserColumn = (
  t: (text: string) => string,
  handleDelete: (id: Url) => void,
): ColumnType<UserInterface>[] => [
  {
    key: "avatar",
    dataIndex: "avatar",
    name: t("avatar"),
    render: (avatar) => (
      <img
        src={avatar}
        alt="User Avatar"
        className="size-10 rounded-full object-cover"
      />
    ),
  },
  {
    key: "username",
    dataIndex: "username",
    name: t("user"),
  },
  {
    key: "email",
    dataIndex: "email",
    name: t("Email"),
  },
  {
    key: "role",
    dataIndex: "role",
    name: t("role"),
    render: (status) => (
      <Badge
        className="inline-block"
        color={
          status === UserRole.SUPER_ADMIN
            ? "warning"
            : status === UserRole.CONTENT
              ? "purple"
              : status === UserRole.MONITORING
                ? "success"
                : status === UserRole.ACCOUNTING
                  ? "failure"
                  : "dark"
        }
      >
        {status ?? "-"}
      </Badge>
    ),
  },
  {
    key: "actions",
    dataIndex: "id",
    render: (id) => (
      <div
        className={"flex gap-6"}
        onClick={(event) => event.stopPropagation()}
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

export default createUserColumn;
