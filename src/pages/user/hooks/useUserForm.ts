import { useNavigate, useParams } from "react-router-dom";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutate from "../../../core/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "../../../core/enums/MutateRequestMethod.ts";
import useToast from "../../../core/hooks/useToast.tsx";
import { entries } from "lodash";
import { USER_QUERY_KEY } from "../constants/user.constants.ts";
import { UserInterface } from "../interfaces/user.interface.ts";
import createManagementSchema, {
  ManagementFormType,
} from "../schemas/createManagementSchema.ts";

const useUserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success } = useToast();
  const { t } = useTranslation();
  const query = useGetOne<UserInterface>({
    id: `${id}`,
    url: [USER_QUERY_KEY],
    options: { enabled: false },
  });
  const schema = useMemo(() => createManagementSchema(t, Boolean(id)), [t, id]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setValue,
  } = useForm<ManagementFormType>({ resolver: yupResolver(schema) });

  const handleSuccess = () => {
    let message = t("userHasBeenCreated");
    if (id) {
      message = t("userHasBeenEdited");
    }
    success({ message });
    navigate("/user");
  };

  const { query: create } = useMutate<UserInterface>({
    url: [USER_QUERY_KEY],
    method: MutateRequestMethod.POST,
    options: {
      onSuccess: handleSuccess,
    },
  });

  const { query: update } = useMutate<UserInterface>({
    url: [USER_QUERY_KEY, `${id}`],
    method: MutateRequestMethod.PUT,
    options: {
      onSuccess: handleSuccess,
    },
  });

  useEffect(() => {
    if (id) {
      query.refetch();
    }
  }, [id]);

  useEffect(() => {
    const item = query.data;
    console.log(item);
    if (item) {
      setValue("username", item.username);
      setValue("email", item.email);
      setValue("role", item.role);

      if (item.avatar) {
        const avatarPath = item.avatar.startsWith("/")
          ? item.avatar
          : `/${item.avatar}`;
        setValue("avatar", avatarPath);
      } else {
        console.warn("Avatar topilmadi:", item);
      }
    }
  }, [query.data, setValue]);

  const onSubmit = (data: ManagementFormType) => {
    const formData = new FormData();
    entries(data).forEach(([key, value]) => {
      if (value instanceof Array) {
        formData.append(key, JSON.stringify(value));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string);
      }
    });
    if (id) {
      update.mutate(formData);
    } else {
      create.mutate(formData);
    }
  };

  console.log(errors);

  return {
    handleSubmit,
    errors,
    register,
    control,
    onSubmit,
    id,
  };
};

export default useUserForm;
