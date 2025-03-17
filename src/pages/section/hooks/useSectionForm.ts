import { useNavigate, useParams } from "react-router-dom";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import useToast from "../../../core/hooks/useToast.tsx";
import useMutate from "../../../core/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "../../../core/enums/MutateRequestMethod.ts";
import { LanguageInterface } from "../../../core/interfaces/language.interface.ts";
import { SectionInterface } from "../interfaces/section.interface.ts";
import { createSectionSchema } from "../schemas";
import { SECTION_QUERY_KEY } from "../contants/section.constants.ts";
import { SectionFormType } from "../schemas/createSectionSchema.ts";

const useDepartmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success } = useToast();
  const { t } = useTranslation();
  const query = useGetOne<SectionInterface>({
    id: `${id}`,
    url: ["section"],
    options: { enabled: false },
  });
  const schema = useMemo(() => createSectionSchema(t), [t]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<SectionFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      departmentId: null,
    },
  });

  const handleSuccess = () => {
    let message = t("sectionCreated");
    if (id) {
      message = t("sectionEdited");
    }
    success({ message });
    navigate("/section");
  };

  const { query: create } = useMutate<SectionFormType>({
    url: [SECTION_QUERY_KEY],
    method: MutateRequestMethod.POST,
    options: {
      onSuccess: handleSuccess,
    },
  });
  const { query: update } = useMutate<SectionFormType>({
    url: [SECTION_QUERY_KEY, `${id}`],
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
      setValue("departmentId", item.departmentId);
    }
  }, [query.data, setValue]);

  const onSubmit = (data: SectionFormType) => {
    data = {
      ...data,
      departmentId: data.departmentId === -1 ? undefined : data.departmentId,
    };
    if (id) {
      update.mutate(data);
    } else {
      create.mutate(data);
    }
  };

  return {
    handleSubmit,
    errors,
    register,
    onSubmit,
    id,
  };
};

export default useDepartmentForm;
