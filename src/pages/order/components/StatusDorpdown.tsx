import { OrderStatus } from "../enums/OrderStatus.ts";
import useMutate from "../../../core/hooks/api/useMutate.ts";
import { OrderInterface } from "../interfaces/order.interface.ts";
import { MutateRequestMethod } from "../../../core/enums/MutateRequestMethod.ts";
import { Badge, Dropdown } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import useToast from "../../../core/hooks/useToast.tsx"; // ✅ Toastni import qilamiz

interface StatusDropdownProps {
  item: OrderInterface;
  onStatusChange: () => void;
}

const StatusDropdown = ({ item, onStatusChange }: StatusDropdownProps) => {
  const { t } = useTranslation();
  const { success, error } = useToast();

  const {
    query: { mutateAsync },
  } = useMutate<OrderInterface>({
    url: ["order", `${item.id}`],
    method: MutateRequestMethod.PUT,
  });

  const handleChangeStatus = async (status: OrderStatus) => {
    try {
      await mutateAsync({ status });
      success({ message: t("Status muvaffaqiyatli o‘zgartirildi!") });
      onStatusChange();
    } catch {
      error({ message: t("Statusni o‘zgartirishda xatolik!") });
    }
  };

  return (
    <Dropdown
      className={"p-0"}
      label={
        <Badge
          color={
            item.status === OrderStatus.PENDING
              ? "warning"
              : item.status === OrderStatus.IN_PROGRESS
                ? "purple"
                : item.status === OrderStatus.COMPLETED
                  ? "success"
                  : item.status === OrderStatus.CANCELED
                    ? "failure"
                    : "dark"
          }
        >
          <div className={"!flex items-center gap-1"}>
            {item.status} <ChevronRight size={10} />
          </div>
        </Badge>
      }
      inline
      placement="right-start"
      arrowIcon={false}
    >
      {Object.values(OrderStatus)
        .filter((value) => value !== item.status)
        .map((statusValue) => (
          <Dropdown.Item
            className={"px-3 py-1"}
            key={statusValue}
            onClick={() => handleChangeStatus(statusValue)}
          >
            {t(statusValue)}
          </Dropdown.Item>
        ))}
    </Dropdown>
  );
};

export default StatusDropdown;
