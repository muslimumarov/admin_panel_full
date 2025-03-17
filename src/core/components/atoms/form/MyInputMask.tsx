import { Label, TextInputProps } from "flowbite-react";
import InputMask from "react-input-mask";
import { FieldValues } from "react-hook-form";
import { InputProps } from "../../../interfaces/input-props.interface.ts";
import { twMerge } from "tailwind-merge";

export type MyInputMaskProps<T extends FieldValues> = InputProps<T> &
  Omit<TextInputProps, "children" | "color"> & {
    mask: string;
  };

const MyInputMask = <T extends FieldValues>({
  register,
  error,
  name,
  mask,
  required,
  rules = {},
  helperText,
  placeholder = "+998 (__) ___-__-__",
  label,
  ...props
}: MyInputMaskProps<T>) => {
  return (
    <Label color={error ? "failure" : "default"}>
      {label && (
        <div className={"mb-2"}>
          {label} {required && <span className={"text-red-600"}>*</span>}
        </div>
      )}
      {name && register ? (
        <div className="relative">
          <InputMask
            mask={mask}
            {...props}
            {...register(name, rules)}
            placeholder={placeholder}
            className={twMerge([
              "block w-full rounded-lg border border-gray-300 bg-transparent p-2.5 text-sm text-gray-900 outline-0 disabled:cursor-not-allowed disabled:opacity-50 ",
              "dark:text-white dark:placeholder:text-gray-400",
              "focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500",
              error &&
                "!border-red-500 !bg-red-50 !text-red-900 !placeholder-red-700 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500",
            ])}
          />
          <p
            className={twMerge([
              "mt-2 text-sm text-gray-500 dark:text-gray-400",
              error && "text-red-600 dark:text-red-500",
            ])}
          >
            {error || helperText}
          </p>
        </div>
      ) : (
        <div className="relative">
          <InputMask
            mask={mask}
            {...props}
            className={twMerge([
              "block w-full rounded-lg border border-gray-300 bg-transparent p-2.5 text-sm text-gray-900 outline-0 disabled:cursor-not-allowed disabled:opacity-50 ",
              "dark:text-white dark:placeholder:text-gray-400",
              "focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500",
            ])}
          />
          <p
            className={twMerge([
              "mt-2 text-sm text-gray-500 dark:text-gray-400",
            ])}
          >
            {error || helperText}
          </p>
        </div>
      )}
    </Label>
  );
};

export default MyInputMask;
