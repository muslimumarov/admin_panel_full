import { useParams } from "react-router-dom";
import useGetOne from "../../../core/hooks/api/useGetOne.ts";
import { OrderInterface } from "../interfaces/order.interface.ts";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import createOrderSchema, {
  OrderFormType,
} from "../schemas/createOrderSchema.ts";

const useOrderForm = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const query = useGetOne<OrderInterface>({
    id: `${id}`,
    url: ["order"],
    options: { enabled: !!id }, // ID mavjud bo‘lsa so‘rov jo‘natiladi
  });

  const schema = useMemo(() => createOrderSchema(t), [t]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm<OrderFormType>({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (id) {
      query.refetch();
    }
  }, [id]);

  const onSubmit = (data: OrderFormType) => {
    console.log("sentData:", data);
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

export default useOrderForm;
