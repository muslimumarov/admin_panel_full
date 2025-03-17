import * as yup from "yup";

const createLoginSchema = (t: (text: string) => string) =>
  yup.object().shape({
    email: yup.string().required(t("Login kiritilishi shart")),
    password: yup.string().required(t("Parol kiritilishi shart")),
  });

export default createLoginSchema;
