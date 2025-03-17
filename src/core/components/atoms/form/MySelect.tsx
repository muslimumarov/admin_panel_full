import { Label, Select, SelectProps } from "flowbite-react";
import { FieldValues } from "react-hook-form";
import { InputProps } from "../../../interfaces/input-props.interface.ts";
import { SelectInterface } from "../../../interfaces/select.interface.ts";

export type MySelectProps<T extends FieldValues> = InputProps<T> &
  SelectProps & {
    options: SelectInterface[];
  };

const MySelect = <T extends FieldValues>({
  register,
  error,
  name,
  required,
  rules = {},
  helperText,
  label,
  options = [],
  ...props
}: MySelectProps<T>) => {
  const optionsList = options.map((option, index) => (
    <option
      key={index}
      value={option.value || ""}
      className={"dark:bg-dark-secondary"}
    >
      {option.label}
    </option>
  ));
  const theme = {
    field: {
      select: {
        base: "block w-full border border-gray-300 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent",
      },
    },
  };

  return (
    <Label color={error ? "failure" : "default"}>
      {label && (
        <div className={"mb-2"}>
          {label} {required && <span className={"text-red-600"}>*</span>}
        </div>
      )}
      {name && register ? (
        <div>
          <Select
            {...props}
            {...register(name, rules)}
            color={error ? "failure" : "default"}
            helperText={error || helperText}
            theme={theme}
          >
            {optionsList}
          </Select>
        </div>
      ) : (
        <Select {...props} color={"default"} theme={theme}>
          {optionsList}
        </Select>
      )}
    </Label>
  );
};

export default MySelect;
