import { Avatar, Dropdown } from "flowbite-react";
import useLogin from "../../auth/hooks/useLogin.tsx";
import { useTranslation } from "react-i18next";
import useUserStore from "../../../core/store/useUserStore.ts";
import { handleImageFallback } from "../../../core/utils/helpers.ts";

const Profile = () => {
  const { logout } = useLogin();
  const { t } = useTranslation();
  const { me } = useUserStore();

  return (
    <div className="relative inline-block">
      <Dropdown
        arrowIcon={true}
        inline
        label={
          <Avatar
            bordered
            img={`/${me?.avatar}`}
            className="h-[30px] object-cover"
            alt={""}
            onError={handleImageFallback}
            rounded
          />
        }
        className="absolute left-[-50px] top-[40px] w-48"
      >
        <Dropdown.Header>
          <span className="block text-sm">
            {t(me?.role || "Foydalanuvchi topilmadi")}
          </span>
          <span className="block truncate text-sm font-medium">
            {me?.email || t("Email topilmadi")}
          </span>
        </Dropdown.Header>
        <Dropdown.Item href={"/settings"}>{t("Sozlamalar")}</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item className="text-red-600" onClick={logout}>
          {t("Chiqish")}
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default Profile;
