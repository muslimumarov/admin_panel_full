import { Label, TextInputProps } from "flowbite-react";
import InputMask from "react-input-mask";
import { FieldValues } from "react-hook-form";
import { InputProps } from "../../../interfaces/input-props.interface.ts";
import { twMerge } from "tailwind-merge";

export type PhoneNumberInputProps<T extends FieldValues> = InputProps<T> &
  Omit<TextInputProps, "children" | "color">;

const PhoneNumberInput = <T extends FieldValues>({
  register,
  error,
  name,
  rules = {},
  helperText,
  label,
  placeholder = "+998 (__) ___-__-__",
  ...props
}: PhoneNumberInputProps<T>) => {
  return (
    <Label color={error ? "failure" : "default"}>
      {label && (
        <div className={"mb-2"}>
          {label} {props.required && <span className={"text-red-600"}>*</span>}
        </div>
      )}
      {name && register ? (
        <div className="relative">
          <InputMask
            mask={"+999 (99) 999-99-99"}
            {...props}
            {...register(name, rules)}
            placeholder={placeholder}
            className={twMerge([
              "bg-white-50 text-white-900 block w-full rounded-lg border border-gray-300 p-2.5 text-sm",
              "dark:border-white-600 dark:bg-transparent",
              "focus:border-blue-700 focus:ring-blue-500",
              error &&
                "!border-red-500 !bg-red-50 !text-red-900 !placeholder-red-700",
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
            mask={"+998 (99) 999-99-99"}
            {...props}
            className={twMerge([
              "bg-white-50 block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900",
              "dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500",
              "focus:border-blue-500 focus:ring-blue-500",
              "active:border-blue-700",
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

export default PhoneNumberInput;
