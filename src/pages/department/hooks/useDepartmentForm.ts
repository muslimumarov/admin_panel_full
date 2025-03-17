import { useNavigate, useParams } from "react-router-dom";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { DepartmentInterface } from "../interfaces/department.interface.ts";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import createDepartmentSchema, {
  DepartmentFormType,
} from "../schemas/createDepartmentSchema.ts";
import useToast from "../../../core/hooks/useToast.tsx";
import useMutate from "../../../core/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "../../../core/enums/MutateRequestMethod.ts";
import { LanguageInterface } from "../../../core/interfaces/language.interface.ts";
import { DEPARTMENT_QUERY_KEY } from "../contants/Department.constants.ts";

const useDepartmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success } = useToast();
  const { t } = useTranslation();
  const query = useGetOne<DepartmentInterface>({
    id: `${id}`,
    url: ["department"],
    options: { enabled: false },
  });
  const schema = useMemo(() => createDepartmentSchema(t), [t]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<DepartmentFormType>({ resolver: yupResolver(schema) });

  const handleSuccess = () => {
    let message = t("departmentCreated");
    if (id) {
      message = t("departmentUpdated");
    }
    success({ message });
    navigate("/department");
  };

  const { query: create } = useMutate<DepartmentFormType>({
    url: [DEPARTMENT_QUERY_KEY],
    method: MutateRequestMethod.POST,
    options: {
      onSuccess: handleSuccess,
    },
  });
  const { query: update } = useMutate<DepartmentFormType>({
    url: [DEPARTMENT_QUERY_KEY, `${id}`],
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

  const onSubmit = (data: DepartmentFormType) => {
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
