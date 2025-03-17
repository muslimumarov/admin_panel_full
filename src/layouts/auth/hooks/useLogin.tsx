import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { createLoginSchema } from "../schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutate from "../../../core/hooks/api/useMutate.ts";
import useAuthStore from "../../../core/store/useAuthStore.ts";
import get from "lodash/get";
import { LoginInterface } from "../interfaces/login.interface.ts";
import { LoginResponseInterface } from "../interfaces/loginResponse.interface.ts";
import { useNavigate } from "react-router-dom";
import { MutateRequestMethod } from "../../../core/enums/MutateRequestMethod.ts";
import useUserStore from "../../../core/store/useUserStore.ts";

const useLogin = () => {
  const { t } = useTranslation();
  const { setAccessToken, setRefreshToken } = useAuthStore();
  const navigate = useNavigate();
  const { setMe } = useUserStore();

  const schema = useMemo(() => createLoginSchema(t), [t]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInterface>({
    resolver: yupResolver(schema),
  });

  const handleSuccess = (response?: LoginResponseInterface) => {
    console.log("Login response:", response);
    setAccessToken(get(response, "accessToken", null));
    setRefreshToken(get(response, "refreshToken", null));
    console.log("Admin data:", get(response, "admin", null));
    setMe(get(response, "admin", null));
    navigate("/");
  };

  const { query: login } = useMutate<LoginResponseInterface>({
    url: ["auth/login"],
    method: MutateRequestMethod.POST,
    options: {
      onSuccess: handleSuccess,
    },
  });

  const onSubmit = (data: LoginInterface) => {
    login.mutate(data);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setMe(null);
    navigate("/auth");
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    logout,
  };
};

export default useLogin;
