import { Button } from "flowbite-react";
import MyInput from "../../../core/components/atoms/form/MyInput.tsx";
import usePasswordChangeForm from "../hooks/usePasswordChange.ts";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const PasswordChangeForm = () => {
  const { register, handleSubmit, reset, errors, disabled, loading, onSubmit } =
    usePasswordChangeForm();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const onCancel = () => {
    reset();
    navigate(-1);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={" "}>
        <div className="mb-5 w-full md:w-1/2 ">
          <MyInput
            label={t("Joriy parolni kiriting")}
            type="password"
            name="currentPassword"
            register={register}
            error={errors.currentPassword?.message}
            required
          />
        </div>
        <div className="mb-5 w-full md:w-1/2">
          <MyInput
            label={t("Yangi parol kiriting")}
            type="password"
            name="password"
            register={register}
            error={errors.password?.message}
            required
          />
        </div>
        <div className="mb-5 w-full md:w-1/2">
          <MyInput
            label={t("Parolni tasdiqlang")}
            type="password"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword?.message}
            required
          />
        </div>

        <div className={"flex gap-4"}>
          <Button color={"blue"} onClick={onCancel}>
            {" "}
            {t("Cancel")}
          </Button>
          <Button
            color={"blue"}
            isProcessing={loading}
            type="submit"
            disabled={disabled || loading}
          >
            {t("Save")}
          </Button>
        </div>
      </form>
    </>
  );
};

export default PasswordChangeForm;
