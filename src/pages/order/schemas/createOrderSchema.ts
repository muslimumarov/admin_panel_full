import { array, InferType, number, object, string, mixed } from "yup";
import { OrderStatus } from "../enums/OrderStatus.ts";
import { OrderLanguage } from "../interfaces/order.interface.language.ts";

const createOrderSchema = (t: (text: string) => string) =>
  object().shape({
    translations: array<OrderLanguage>()
      .of(
        object({
          title: string().required(t("titleRequired")),
          id: number().optional(),
          serviceType: string().required(t("serviceTypeRequired")),
          serviceName: string().required(t("serviceNameRequired")),
          serviceRoles: string().required(t("serviceRolesRequired")),
          subsystemsCount: number()
            .required(t("subsystemsCountRequired"))
            .min(1, t("min120Chars")),
          price: number()
            .required(t("priceRequired"))
            .min(0, t("priceCannotBeNegative")),
          status: mixed<OrderStatus>().oneOf(
            Object.values(OrderStatus),
            t("invalidStatus"),
          ),
          comment: string().required(t("commentRequired")),
        }),
      )
      .required(t("translationsRequired")),
  });

export type OrderFormType = InferType<ReturnType<typeof createOrderSchema>>;

export default createOrderSchema;
