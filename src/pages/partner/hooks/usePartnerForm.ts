import { useNavigate, useParams } from "react-router-dom";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { PartnerInterface } from "../interfaces/partner.interface.ts";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { createPartnerSchema } from "../schemas";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { PartnerFormType } from "../schemas/createPartnerSchema.ts";
import useMutate from "../../../core/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "../../../core/enums/MutateRequestMethod.ts";
import useToast from "../../../core/hooks/useToast.tsx";
import { PARTNER_QUERY_KEY } from "../constants/partner.constants.ts";
import { entries } from "lodash";
import { PartnerLanguage } from "../interfaces/partner.language.interface.ts";

const usePartnerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success } = useToast();
  const { t } = useTranslation();
  const query = useGetOne<PartnerInterface>({
    id: `${id}`,
    url: [PARTNER_QUERY_KEY],
    options: { enabled: false },
  });
  const schema = useMemo(() => createPartnerSchema(t), [t]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setValue,
  } = useForm<PartnerFormType>({ resolver: yupResolver(schema) });

  const handleSuccess = () => {
    let message = t("partnerCreated");
    if (id) {
      message = t("partnerUpdated");
    }
    success({ message });
    navigate("/partner");
  };

  const { query: create } = useMutate<PartnerInterface>({
    url: [PARTNER_QUERY_KEY],
    method: MutateRequestMethod.POST,
    options: {
      onSuccess: handleSuccess,
    },
  });

  const { query: update } = useMutate<PartnerInterface>({
    url: [PARTNER_QUERY_KEY, `${id}`],
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
    if (item) {
      setValue(
        "translations",
        entries(item.translations).map(([language, value]) => ({
          ...value,
          language,
        })) as PartnerLanguage[],
      );
      setValue("url", item.url);
      setValue("logo", `/${item.logo}`);
    }
  }, [query.data, setValue]);

  const onSubmit = (data: PartnerFormType) => {
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

  return {
    handleSubmit,
    errors,
    register,
    control,
    onSubmit,
    id,
  };
};

export default usePartnerForm;
