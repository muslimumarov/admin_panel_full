import { useNavigate, useParams } from "react-router-dom";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { NewsInterface } from "../interfaces/news.interface.ts";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { createNewsSchema } from "../schemas";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewsFormType } from "../schemas/createNewsSchema.ts";
import { createSlug } from "../../../core/utils/helpers.ts";
import useMutate from "../../../core/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "../../../core/enums/MutateRequestMethod.ts";
import useToast from "../../../core/hooks/useToast.tsx";
import { NEWS_QUERY_KEY } from "../constants/news.constants.ts";
import { entries } from "lodash";
import { LanguageInterface } from "../../../core/interfaces/language.interface.ts";
import { CategoryInterface } from "../../categories/interfaces/category.interface.ts";

const useNewsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success } = useToast();
  const { t } = useTranslation();
  const query = useGetOne<NewsInterface>({
    id: `${id}`,
    url: [NEWS_QUERY_KEY],
    options: { enabled: false },
  });
  const schema = useMemo(() => createNewsSchema(t), [t]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setValue,
    watch,
    getValues,
  } = useForm<NewsFormType>({ resolver: yupResolver(schema) });

  const handleSuccess = () => {
    let message = t("newsCreated");
    if (id) {
      message = t("newsEdited");
    }
    success({ message });
    navigate("/news");
  };

  const { query: create } = useMutate<NewsInterface>({
    url: [NEWS_QUERY_KEY],
    method: MutateRequestMethod.POST,
    options: {
      onSuccess: handleSuccess,
    },
  });

  const { query: update } = useMutate<CategoryInterface>({
    url: [NEWS_QUERY_KEY, `${id}`],
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
    console.log(item);
    if (item) {
      setValue(
        "translations",
        entries(item.translations).map(([language, value]) => ({
          ...value,
          language,
        })) as LanguageInterface[],
      );
      setValue("slug", item.slug);
      setValue("tags", item.tags?.join(",") || "");
      setValue("status", item.status);
      setValue("categoryId", item.categoryId);
      if (item.image) {
        const avatarPath = item.image.startsWith("/")
          ? item.image
          : `/${item.image}`;
        setValue("image", avatarPath);
      } else {
        console.warn("image topilmadi:", item);
      }
    }
  }, [query.data, setValue]);

  const onSubmit = (data: NewsFormType) => {
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

export default useNewsForm;
