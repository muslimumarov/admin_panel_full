import { string, object, ref } from "yup";

export const passwordSchema = object().shape({
  currentPassword: string().required("Joriy parol talab qilinadi"),
  password: string()
    .min(8, "Yangi parol kamida 8 ta belgidan iborat bo‘lishi kerak")
    .required("Yangi parol talab qilinadi"),
  confirmPassword: string()
    .oneOf([ref("password")], "Parollar mos kelishi kerak")
    .required("Tasdiqlash paroli talab qilinadi"),
});
