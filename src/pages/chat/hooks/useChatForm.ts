import { useParams } from "react-router-dom";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { ChatInterface } from "../interfaces/chat.interface.ts";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import createChatSchema, { ChatFormType } from "../schemas/createChatSchema.ts";

const useChatForm = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const query = useGetOne<ChatInterface>({
    id: `${id}`,
    url: ["chat"],
    options: { enabled: false },
  });
  const schema = useMemo(() => createChatSchema(t), [t]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setValue,
  } = useForm<ChatFormType>({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (id) {
      query.refetch();
    }
  }, [id]);

  useEffect(() => {
    const item = query.data;
    if (item) {
      // setValue("translations", item.translations);
      // setValue("category", item.category)
    }
  }, [query.data, setValue]);

  const onSubmit = (data: ChatFormType) => {
    console.log(data, schema);
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

export default useChatForm;
