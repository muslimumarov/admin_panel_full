import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import useMutate from "../../../core/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "../../../core/enums/MutateRequestMethod.ts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import createOrderModalSchema, {
  OrderModalFormType,
} from "../schemas/createOrderModalSchema.ts";
import { OrderInterface } from "../interfaces/order.interface.ts";
import { ORDER_QUERY_KEY } from "../contants/action.constants.ts";
import { Url } from "../../../core/hooks/api/useApi.ts";

export const useModalForm = (id: Url | null, handleClose: () => void) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const query = useGetOne<OrderInterface>({
    id: `${id}`,
    url: [ORDER_QUERY_KEY],
    options: { enabled: false },
  });

  const schema = createOrderModalSchema();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<OrderModalFormType>({ resolver: yupResolver(schema) });

  const {
    query: { mutateAsync },
  } = useMutate<OrderInterface>({
    url: [ORDER_QUERY_KEY, `${id}`],
    method: MutateRequestMethod.PUT,
    options: {
      onSuccess: () => {
        navigate("/order");
      },
    },
  });

  useEffect(() => {
    if (id) {
      query.refetch();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [id]);

  useEffect(() => {
    if (query.data) {
      setValue("comment", query.data.comment);
    }
  }, [query.data]);

  const onSubmit = (data: OrderModalFormType) => {
    mutateAsync(data).then(() => {
      setIsOpen(false);
      handleClose();
    });
  };

  return { isOpen, handleSubmit, onSubmit, control, errors, t };
};
