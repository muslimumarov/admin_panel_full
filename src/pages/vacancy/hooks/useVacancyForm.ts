import { useNavigate, useParams } from "react-router-dom";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { createVacancySchema } from "../schemas";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutate from "../../../core/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "../../../core/enums/MutateRequestMethod.ts";
import useToast from "../../../core/hooks/useToast.tsx";
import { entries } from "lodash";
import { VacancyInterface } from "../interfaces/vacancy.interface.ts";
import { VACANCY_QUERY_KEY } from "../constants/vacancy.constants.ts";
import { VacancyFormType } from "../schemas/createVacancySchema.ts";
import { VacancyLanguageInterface } from "../interfaces/vacancy.language.interfaces.ts";

const useVacancyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success } = useToast();
  const { t } = useTranslation();

  const query = useGetOne<VacancyInterface>({
    id: `${id}`,
    url: [VACANCY_QUERY_KEY],
    options: { enabled: false },
  });
  const schema = useMemo(() => createVacancySchema(t), [t]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setValue,
  } = useForm<VacancyFormType>({ resolver: yupResolver(schema) });

  const handleSuccess = () => {
    let message = t("vacanciesCreated");
    if (id) {
      message = t("vacanciesUpdated");
    }
    success({ message });
    navigate("/vacancy");
  };

  const { query: create } = useMutate<VacancyInterface>({
    url: [VACANCY_QUERY_KEY],
    method: MutateRequestMethod.POST,
    options: {
      onSuccess: handleSuccess,
    },
  });

  const { query: update } = useMutate<VacancyLanguageInterface>({
    url: [VACANCY_QUERY_KEY, `${id}`],
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
        })) as VacancyLanguageInterface[],
      );
      setValue("status", item.status);
      setValue("salary", item.salary);
      setValue("skills", item.skills?.join(",") || "");
    }
  }, [query.data, setValue]);

  const onSubmit = (data: VacancyFormType) => {
    const formattedData = {
      ...data,
      skills: data.skills?.split(","),
    };

    console.log(formattedData);
    if (id) {
      update.mutate(formattedData);
    } else {
      create.mutate(formattedData);
    }
    console.log("Formatted Data:", formattedData);
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

export default useVacancyForm;
