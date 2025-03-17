import { useNavigate, useParams } from "react-router-dom";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { useEffect, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutate from "../../../core/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "../../../core/enums/MutateRequestMethod.ts";
import useToast from "../../../core/hooks/useToast.tsx";
import { entries } from "lodash";
import {
  ServicesInterface,
  ServicesTranslation,
} from "../interfaces/services.interface.ts";
import { createServicesSchema } from "../schemas";
import { ServicesFormType } from "../schemas/createServicesSchema.ts";
import { SERVICES_QUERY_KEY } from "../constants/services.constants.ts";
import { createSlug } from "../../../core/utils/helpers.ts";

const useServicesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success } = useToast();
  const { t } = useTranslation();
  const query = useGetOne<ServicesInterface>({
    id: `${id}`,
    url: [SERVICES_QUERY_KEY],
    options: { enabled: false },
  });
  const schema = useMemo(() => createServicesSchema(t), [t]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setValue,
    getValues,
    watch,
  } = useForm<ServicesFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      orderSchemaFields: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "orderSchemaFields",
    keyName: "key",
  });

  const handleSuccess = () => {
    let message = t("serviceCreated");
    if (id) {
      message = t("serviceUpdated");
    }
    success({ message });
    navigate("/services");
  };

  const { query: create } = useMutate<ServicesInterface>({
    url: [SERVICES_QUERY_KEY],
    method: MutateRequestMethod.POST,
    options: {
      onSuccess: handleSuccess,
    },
  });

  const { query: update } = useMutate<ServicesTranslation>({
    url: [SERVICES_QUERY_KEY, `${id}`],
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
    setValue("slug", createSlug(getValues("translations.0.title")));
  }, [watch("translations.0.title")]);

  useEffect(() => {
    const item = query.data;
    if (item) {
      setValue(
        "translations",
        entries(item.translations).map(([language, value]) => ({
          ...value,
          language,
        })) as ServicesTranslation[],
      );
      setValue("slug", item.slug);
      setValue("status", item.status);
      setValue("tags", item.tags?.join(",") || "");
      setValue("logo", `/${item.logo}`);
      setValue("price", item.price);
      setValue("contactInfo", item.contactInfo);
      setValue(
        "documents",
        Array.isArray(item.documents)
          ? item.documents.map((doc) => `/${doc}`)
          : [],
      );
      setValue(
        "orderSchemaFields",
        Array.isArray(item.orderSchema?.fields)
          ? item.orderSchema.fields.map((field) => ({
              name: field.name,
              type: field.type,
              required: field.required ?? false,
              key: field.name,
            }))
          : [],
      );
    }
  }, [query.data, setValue]);

  const onSubmit = (data: ServicesFormType) => {
    const formData = new FormData();
    entries(data).forEach(([key, value]) => {
      if (key === "documents" && value instanceof Array) {
        value.forEach((file) => {
          if (file instanceof File) {
            formData.append(key, file);
          }
        });
      } else if (value instanceof Array) {
        formData.append(key, JSON.stringify(value));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (key === "tags") {
        formData.append(key, JSON.stringify(`${value}`.split(",")));
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

  return {
    handleSubmit,
    errors,
    register,
    control,
    onSubmit,
    id,
    setValue,
    watch,
    fields,
    append,
    remove,
  };
};

export default useServicesForm;
