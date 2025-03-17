import { useNavigate, useParams } from "react-router-dom";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { CategoryInterface } from "../interfaces/category.interface.ts";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import createCategorySchema, {
  CategoryFormType,
} from "../schemas/createCategorySchema.ts";
import { CATEGORY_QUERY_KEY } from "../contants/category.constants.ts";
import useMutate from "../../../core/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "../../../core/enums/MutateRequestMethod.ts";
import useToast from "../../../core/hooks/useToast.tsx";
import { LanguageInterface } from "../../../core/interfaces/language.interface.ts";

const useCategoryForm = () => {
  const navigate = useNavigate();
  const { success } = useToast();
  const { id } = useParams();
  const { t } = useTranslation();
  const query = useGetOne<CategoryInterface>({
    id: `${id}`,
    url: [CATEGORY_QUERY_KEY],
    options: { enabled: false },
  });
  const schema = useMemo(() => createCategorySchema(t), [t]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<CategoryFormType>({ resolver: yupResolver(schema) });

  const handleSuccess = () => {
    let message = t("categoryCreated");
    if (id) {
      message = t("categoryEdited");
    }
    success({ message });
    navigate("/category");
  };

  const { query: create } = useMutate<CategoryInterface>({
    url: [CATEGORY_QUERY_KEY],
    method: MutateRequestMethod.POST,
    options: {
      onSuccess: handleSuccess,
    },
  });

  const { query: update } = useMutate<CategoryInterface>({
    url: [CATEGORY_QUERY_KEY, `${id}`],
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
        Object.entries(item.translations).map(([language, value]) => ({
          ...value,
          language,
        })) as LanguageInterface[],
      );
    }
  }, [query.data, setValue]);

  const onSubmit = (data: CategoryFormType) => {
    if (id) {
      update.mutate(data);
    } else {
      create.mutate(data);
    }
  };

  console.log(errors);

  return {
    handleSubmit,
    errors,
    register,
    onSubmit,
    id,
  };
};

export default useCategoryForm;
