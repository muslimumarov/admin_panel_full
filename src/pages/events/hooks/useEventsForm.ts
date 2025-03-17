import { useParams } from "react-router-dom";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { EventsInterface } from "../interfaces/events.interface.ts";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { createEventsSchema } from "../schemas";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { EventsFormType } from "../schemas/createEventsSchema.ts";
import { EVENTS_QUERY_KEY } from "../contants/events.constants.ts";

const useEventsForm = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const query = useGetOne<EventsInterface>({
    id: `${id}`,
    url: [EVENTS_QUERY_KEY],
    options: { enabled: false },
  });
  const schema = useMemo(() => createEventsSchema(t), [t]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setValue,
  } = useForm<EventsFormType>({ resolver: yupResolver(schema) });

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

  const onSubmit = (data: EventsFormType) => {
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

export default useEventsForm;
