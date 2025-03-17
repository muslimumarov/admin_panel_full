import { useContext } from "react";
import { ShowChangePasswordContext } from "../contexts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordSchema } from "../schemas/changePasswordSchema.ts";
import useMutate from "../../../core/hooks/api/useMutate.ts";
import { ChangePasswordInterface } from "../interfaces/change-password.interface.ts";
import useToast from "../../../core/hooks/useToast.tsx";
import { MutateRequestMethod } from "../../../core/enums/MutateRequestMethod.ts";

const usePasswordChangeForm = () => {
  const { success } = useToast();
  const { show, setShow } = useContext(ShowChangePasswordContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ChangePasswordInterface>({
    resolver: yupResolver(passwordSchema),
    mode: "onChange",
  });

  const { query } = useMutate<unknown>({
    url: ["auth", "change-password"],
    method: MutateRequestMethod.POST,
    options: {
      onSuccess: () => {
        success({ message: "Parol muvaffaqiyatli o‘zgartirildi!" });
        reset();
        handleCloseModal();
      },
    },
  });

  const handleCloseModal = () => {
    setShow(false);
    reset();
  };

  const onSubmit = (data: ChangePasswordInterface) => {
    query.mutate({
      password: data.password,
      currentPassword: data.currentPassword,
    });
  };

  return {
    show,
    handleCloseModal,
    register,
    handleSubmit,
    reset,
    errors,
    loading: query.isPending,
    disabled: !isValid,
    onSubmit,
  };
};

export default usePasswordChangeForm;
