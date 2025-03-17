import { useNavigate, useParams } from "react-router-dom";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { PositionInterface } from "../interfaces/position.interface.ts";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import createPositionSchema, {
  PositionFormType,
} from "../schemas/createPositionSchema.ts";
import { POSITION_QUERY_KEY } from "../contants/position.constants.ts";
import useMutate from "../../../core/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "../../../core/enums/MutateRequestMethod.ts";
import useToast from "../../../core/hooks/useToast.tsx";
import { LanguageInterface } from "../../../core/interfaces/language.interface.ts";

const usePositionForm = () => {
  const navigate = useNavigate();
  const { success } = useToast();
  const { id } = useParams();
  const { t } = useTranslation();
  const query = useGetOne<PositionInterface>({
    id: `${id}`,
    url: [POSITION_QUERY_KEY],
    options: { enabled: false },
  });
  const schema = useMemo(() => createPositionSchema(t), [t]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<PositionFormType>({ resolver: yupResolver(schema) });

  const handleSuccess = () => {
    let message = t("positionCreated");
    if (id) {
      message = t("positionEdited");
    }
    success({ message });
    navigate("/position");
  };

  const { query: create } = useMutate<PositionInterface>({
    url: [POSITION_QUERY_KEY],
    method: MutateRequestMethod.POST,
    options: {
      onSuccess: handleSuccess,
    },
  });

  const { query: update } = useMutate<PositionInterface>({
    url: [POSITION_QUERY_KEY, `${id}`],
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

  const onSubmit = (data: PositionFormType) => {
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

export default usePositionForm;
