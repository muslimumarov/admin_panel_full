import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Button, Avatar } from "flowbite-react";
import { Camera } from "lucide-react";
import MyInput from "../../../core/components/atoms/form/MyInput.tsx";
import useUserStore from "../../../core/store/useUserStore.ts";
import { handleImageFallback } from "../../../core/utils/helpers.ts";

const Profile = () => {
  const { t } = useTranslation();
  const { register } = useForm();
  const { me } = useUserStore();

  return (
    <form className="flex flex-col items-start gap-6 md:flex-row">
      <div className="md:w-2/3">
        <div className="grid gap-6 md:grid-cols-2">
          <MyInput
            name="first_name"
            label={t("Ismingizni kiriting")}
            register={register}
            required
          />
          <MyInput
            name="last_name"
            label={t("Familyangizni kiriting")}
            register={register}
            required
          />
          <MyInput
            name="company"
            label={t("Elektron pochta manzilingizni kiriting")}
            register={register}
            required
          />
          <MyInput
            name="phone"
            label={t("Telefon raqamingizni kiriting")}
            register={register}
            type="tel"
          />
        </div>
        <div className="mt-6">
          <Button color="blue" type="submit">
            {t("Yuborish")}
          </Button>
        </div>
      </div>

      <div className="relative flex items-center gap-10 md:ml-auto md:w-auto">
        {/* Avatar */}
        <div className="group relative">
          <Avatar
            bordered
            img={`/${me?.avatar}`}
            className="rounded-full object-cover"
            alt=""
            onError={handleImageFallback}
            size="xl"
            rounded
          />

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 cursor-pointer rounded-full bg-black/50 p-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Camera className="size-6 text-white" />
          </div>
        </div>

        <div>
          <span className="block text-xl text-gray-500 dark:text-gray-400">
            {t(me?.role || "Foydalanuvchi topilmadi")}
          </span>
          <span className="block truncate text-xl font-medium text-gray-900 dark:text-white">
            {me?.email || t("Email topilmadi")}
          </span>
        </div>
      </div>
    </form>
  );
};

export default Profile;
