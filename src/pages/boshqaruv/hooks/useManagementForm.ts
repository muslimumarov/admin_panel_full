import { useNavigate, useParams } from "react-router-dom";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { ManagementInterface } from "../interfaces/management.interface.ts";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { createManagementSchema } from "../schemas";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { ManagementFormType } from "../schemas/createManagementSchema.ts";
import useMutate from "../../../core/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "../../../core/enums/MutateRequestMethod.ts";
import useToast from "../../../core/hooks/useToast.tsx";
import { MANAGEMENT_QUERY_KEY } from "../constants/management.constants.ts";
import { entries } from "lodash";
import { ManagementTranslation } from "../interfaces/management.translation.ts";

const useManagementForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success } = useToast();
  const { t } = useTranslation();
  const query = useGetOne<ManagementInterface>({
    id: `${id}`,
    url: [MANAGEMENT_QUERY_KEY],
    options: { enabled: false },
  });
  const schema = useMemo(() => createManagementSchema(t), [t]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setValue,
    watch,
  } = useForm<ManagementFormType>({ resolver: yupResolver(schema) });

  const handleSuccess = () => {
    let message = t("managementCreated");
    if (id) {
      message = t("managementEdited");
    }
    success({ message });
    navigate("/management");
  };

  const { query: create } = useMutate<ManagementInterface>({
    url: [MANAGEMENT_QUERY_KEY],
    method: MutateRequestMethod.POST,
    options: {
      onSuccess: handleSuccess,
    },
  });

  const { query: update } = useMutate<ManagementTranslation>({
    url: [MANAGEMENT_QUERY_KEY, `${id}`],
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
      setValue(
        "translations",
        entries(item.translations).map(([language, value]) => ({
          ...value,
          language,
        })) as ManagementTranslation[],
      );
      setValue("phone", item.phone);
      setValue("email", item.email);
      setValue("avatar", `/${item.avatar}`);
      setValue("phone", item.phone);
      setValue("departmentId", item.departmentId);
      setValue("sectionId", item.sectionId);
      setValue("positionId", item.positionId);
    }
  }, [query.data, setValue]);

  const onSubmit = (data: ManagementFormType) => {
    const formData = new FormData();
    data = {
      ...data,
      departmentId: data.departmentId === -1 ? undefined : data.departmentId,
      sectionId: data.sectionId === -1 ? undefined : data.sectionId,
    };
    entries(data).forEach(([key, value]) => {
      if (value instanceof Array) {
        formData.append(key, JSON.stringify(value));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (key === "tags") {
        formData.append(key, JSON.stringify(`${value}`.split(",")));
      } else {
        if (value !== undefined) formData.append(key, value as string);
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
    setValue,
    id,
    watch,
  };
};

export default useManagementForm;
