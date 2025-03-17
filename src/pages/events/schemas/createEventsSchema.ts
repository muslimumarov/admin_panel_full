import { InferType, number, object, string } from "yup";

const createEventsSchema = (t: (text: string) => string) =>
  object().shape({
    id: number().optional(),
    producer: string().required(t("manufacturerRequired")),
    fullname: string().required(t("fullNameRequired")),
    region: string().required(t("regionRequired")),
    phone: string().required(t("phoneRequired")),
    email: string().email(t("invalidEmail")).required(t("emailRequired")),
    description: string()
      .required(t("descriptionRequired"))
      .min(10, t("min120Chars")),
    action_date: string().required(t("executionDateRequired")),
    createdAt: string().optional(),
    updatedAt: string().optional(),
  });

export type EventsFormType = InferType<ReturnType<typeof createEventsSchema>>;

export default createEventsSchema;
