import { InferType, object, string } from "yup";
import { OrderStatus } from "../enums/OrderStatus.ts";

const createOrderModalSchema = () =>
  object().shape({
    status: string<OrderStatus>().optional(),
    comment: string().required(),
  });

export type OrderModalFormType = InferType<
  ReturnType<typeof createOrderModalSchema>
>;

export default createOrderModalSchema;
