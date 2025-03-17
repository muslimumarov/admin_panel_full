import { OrderStatus } from "../enums/OrderStatus.ts";
import { Language } from "../../../core/enums/Language.ts";
import { OrderLanguage } from "./order.interface.language.ts";

export interface OrderInterface {
  id: number;
  serviceId: number;
  serviceType: string;
  serviceName: string;
  serviceRoles: string;
  subsystemsCount: number;
  schema: string | number | undefined;
  price: number;
  status: OrderStatus;
  dynamicFields: object;
  translations: Record<Language, OrderLanguage>;
  comment: string;
  createdAt: number;
  updatedAt: number;
}
