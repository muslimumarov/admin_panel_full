import logo from "../../../assets/images/logo.png";
import useLogin from "../hooks/useLogin.tsx";
import MyInput from "../../../core/components/atoms/form/MyInput.tsx";
import { Button } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { LoginInterface } from "../interfaces/login.interface.ts";

const Login = () => {
  const { handleSubmit, errors, register, onSubmit } = useLogin();
  const { t } = useTranslation();

  return (
    <>
      <img src={logo} alt="Logo" className="mx-auto mb-8 w-48" />
      <div className="w-full max-w-md rounded-lg bg-white p-10 shadow-md dark:bg-dark-primary">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-sm"
          noValidate
        >
          <div className="mb-5">
            <MyInput<LoginInterface>
              required
              label={t("Foydalanuvchi nomi")}
              placeholder={t("Foydalanuvchi nomini kiriting")}
              register={register}
              name={"email"}
              error={errors.email?.message}
            />
          </div>
          <div className="mb-5">
            <MyInput<LoginInterface>
              required
              label={t("Parol")}
              placeholder={t("Parolni kiriting")}
              type={"password"}
              register={register}
              name={"password"}
              error={errors.password?.message}
            />
          </div>
          <Button type="submit" color="blue" className={"w-full"}>
            {t("Kirish")}
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
