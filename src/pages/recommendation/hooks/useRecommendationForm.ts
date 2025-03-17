import { useNavigate, useParams } from "react-router-dom";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { RecommendationFormType } from "../schemas/createRecommendationSchema.ts";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { createSlug } from "../../../core/utils/helpers.ts";
import useMutate from "../../../core/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "../../../core/enums/MutateRequestMethod.ts";
import useToast from "../../../core/hooks/useToast.tsx";
import { entries } from "lodash";
import { RECOMMENDATION_QUERY_KEY } from "../constants/recommendation.constants.ts";
import createRecommendationSchema from "../schemas/createRecommendationSchema.ts";
import {
  RecommendationInterface,
  RecommendationTranslation,
} from "../interfaces/recommendation.interface.ts";

const useRecommendationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success } = useToast();
  const { t } = useTranslation();
  const query = useGetOne<RecommendationInterface>({
    id: `${id}`,
    url: ["recommendation"],
    options: { enabled: false },
  });
  const schema = useMemo(() => createRecommendationSchema(t), [t]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setValue,
    watch,
    getValues,
  } = useForm<RecommendationFormType>({ resolver: yupResolver(schema) });

  const handleSuccess = () => {
    let message = t("recommendationCreated");
    if (id) {
      message = t("recommendationEdited");
    }
    success({ message });
    navigate("/recommendation");
  };

  const { query: create } = useMutate<RecommendationInterface>({
    url: [RECOMMENDATION_QUERY_KEY],
    method: MutateRequestMethod.POST,
    options: {
      onSuccess: handleSuccess,
    },
  });

  const { query: update } = useMutate<RecommendationTranslation>({
    url: [RECOMMENDATION_QUERY_KEY, `${id}`],
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
    const text = getValues("translations.0.text") || "";
    setValue("slug", createSlug(text));
  }, [watch("translations.0.text")]);

  useEffect(() => {
    const item = query.data;
    console.log(item);
    if (item) {
      setValue(
        "translations",
        entries(item?.translations ?? {}).map(([language, value]) => ({
          language,
          text: value.text,
          description: value.description,
        })) as RecommendationTranslation[],
      );
      setValue("slug", item.slug);
      setValue("tags", item.tags?.join(",") || "");
      setValue("status", item.status);
      setValue("category", item.category);
      setValue("image", `/${item.image}`);
    }
  }, [query.data, setValue]);

  const onSubmit = (data: RecommendationFormType) => {
    console.log("Form yuborildi:", data);
    const formData = new FormData();
    entries(data).forEach(([key, value]) => {
      if (value instanceof Array) {
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
      console.log("Yaratish so‘rovi yuborildi:", formData);
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

export default useRecommendationForm;
