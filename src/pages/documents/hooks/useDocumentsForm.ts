import { useNavigate, useParams } from "react-router-dom";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { DocumentsInterface } from "../interfaces/documents.interface.ts";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { createDocumentsSchema } from "../schemas";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { DocumentFormType } from "../schemas/createDocumentsSchema.ts";
import useMutate from "../../../core/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "../../../core/enums/MutateRequestMethod.ts";
import useToast from "../../../core/hooks/useToast.tsx";
import { DOCUMENT_QUERY_KEY } from "../constants/documents.constants.ts";
import { entries } from "lodash";
import { DocumentLanguage } from "../interfaces/documents.language.ts";
import { createDocumentsCategories } from "../helpers";

const useDocumentsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success } = useToast();
  const { t } = useTranslation();

  const query = useGetOne<DocumentsInterface>({
    id: `${id}`,
    url: [DOCUMENT_QUERY_KEY],
    options: { enabled: false },
  });

  const schema = useMemo(() => createDocumentsSchema(t), [t]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setValue,
    watch,
  } = useForm<DocumentFormType>({ resolver: yupResolver(schema) });

  const handleSuccess = () => {
    let message = t("documentCreate");
    if (id) {
      message = t("documentEdit");
    }
    success({ message });
    navigate("/document");
  };

  const { query: create } = useMutate<DocumentsInterface>({
    url: [DOCUMENT_QUERY_KEY],
    method: MutateRequestMethod.POST,
    options: {
      onSuccess: handleSuccess,
    },
  });

  const { query: update } = useMutate<DocumentsInterface>({
    url: [DOCUMENT_QUERY_KEY, `${id}`],
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
        })) as DocumentLanguage[],
      );

      setValue("slug", item.slug);
      setValue("tags", item.tags?.join(",") || "");
      setValue("status", item.status);
      setValue("documentUrl", item.documentUrl);

      if (item.files) {
        if (Array.isArray(item.files)) {
          const formattedFiles = item.files.filter(
            (file): file is string => typeof file === "string",
          );

          setValue("files", formattedFiles);
        } else if (typeof item.files === "string") {
          setValue("files", item.files);
        }
      } else {
        console.warn("files topilmadi:", item);
        setValue("files", "");
      }
    }
  }, [query.data, setValue]);

  const onSubmit = (data: DocumentFormType) => {
    const formData = new FormData();

    entries(data).forEach(([key, value]) => {
      if (key === "files" && Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) {
            formData.append("files", file);
          }
        });
      } else if (key === "tags") {
        formData.append(key, JSON.stringify(`${value}`.split(",")));
      } else if (key === "translations" && Array.isArray(value)) {
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

  const categories = useMemo(() => createDocumentsCategories(t), [t]);

  console.log(errors, watch("files"));

  return {
    handleSubmit,
    errors,
    register,
    control,
    onSubmit,
    id,
    categories,
  };
};

export default useDocumentsForm;
