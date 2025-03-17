import { useNavigate, useParams } from "react-router-dom";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { createArticlesSchema } from "../schemas";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { createSlug } from "../../../core/utils/helpers.ts";
import useMutate from "../../../core/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "../../../core/enums/MutateRequestMethod.ts";
import useToast from "../../../core/hooks/useToast.tsx";
import { entries } from "lodash";
import { LanguageInterface } from "../../../core/interfaces/language.interface.ts";
import { ArticlesFormType } from "../schemas/createArticlesSchema.ts";
import { ArticlesInterface } from "../interfaces/articles.interface.ts";
import { ARTICLES_QUERY_KEY } from "../constants/articles.constants.ts";

const useNewsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success } = useToast();
  const { t } = useTranslation();
  const query = useGetOne<ArticlesInterface>({
    id: `${id}`,
    url: [ARTICLES_QUERY_KEY],
    options: { enabled: false },
  });
  const schema = useMemo(() => createArticlesSchema(t), [t]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setValue,
    watch,
    getValues,
  } = useForm<ArticlesFormType>({ resolver: yupResolver(schema) });

  const handleSuccess = () => {
    let message = t("articlesCreated");
    if (id) {
      message = t("articlesEdited");
    }
    success({ message });
    navigate("/articles");
  };

  const { query: create } = useMutate<ArticlesInterface>({
    url: [ARTICLES_QUERY_KEY],
    method: MutateRequestMethod.POST,
    options: {
      onSuccess: handleSuccess,
    },
  });

  const { query: update } = useMutate<ArticlesInterface>({
    url: [ARTICLES_QUERY_KEY, `${id}`],
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
      setValue("image", `/${item.image}`);
    }
  }, [query.data, setValue]);

  const onSubmit = (data: ArticlesFormType) => {
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
