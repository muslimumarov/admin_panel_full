import { object, string, InferType, mixed } from "yup";

const createManagementSchema = (t: (text: string) => string, isEdit: boolean) =>
  object().shape({
    username: string().optional(),
    avatar: mixed().optional(),
    email: string().required(t("emailRequired")),
    password: isEdit
      ? string().optional()
      : string().required(t("passwordRequired")),
    role: string().required(t("roleRequired")),
  });

export type ManagementFormType = InferType<
  ReturnType<typeof createManagementSchema>
>;

export default createManagementSchema;
