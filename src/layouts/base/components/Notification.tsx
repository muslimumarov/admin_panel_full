import { Bell } from "lucide-react";
import { Dropdown } from "flowbite-react";
import { useTranslation } from "react-i18next";

const Notification = () => {
  const { t } = useTranslation();
  return (
    <Dropdown
      arrowIcon={false}
      className="relative"
      inline
      label={
        <div className="relative">
          <Bell size={22} />
          <span className="absolute -top-1 right-0 inline-flex items-center justify-center rounded-full bg-red-600 px-1 py-0.5 text-xs leading-none text-white">
            3
          </span>
        </div>
      }
    >
      <Dropdown.Header>
        <span className="block text-sm font-medium"> {t("Xabarlar")}</span>
      </Dropdown.Header>
      <Dropdown.Item> {t("Barcha xabarlarni ko'rish")}</Dropdown.Item>
    </Dropdown>
  );
};

export default Notification;
