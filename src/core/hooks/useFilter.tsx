import { useForm } from "react-hook-form";
import useQueryParams from "./useQueryParams.ts";
import { useEffect } from "react";
import { entries } from "lodash";

const useFilter = () => {
  const { params, handleSetParams } = useQueryParams();
  const { handleSubmit, setValue, getValues, control, register, watch, reset } =
    useForm({ mode: "onChange" });

  useEffect(() => {
    entries(params).forEach(([key, value]) => {
      if (/[[\]]$/g.test(key) && !(value instanceof Array)) {
        setValue(key, [value]);
      } else {
        setValue(key, value);
      }
    });
  }, [params, setValue]);

  return {
    params,
    handleSubmit,
    handleSetParams,
    control,
    register,
    watch,
    getValues,
    reset,
  };
};

export default useFilter;
