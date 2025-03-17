import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useFilter from "../../../hooks/useFilter.tsx";
import { get } from "lodash";
import { FieldValues } from "react-hook-form";
import { Button, ButtonProps, Popover, Tooltip } from "flowbite-react";
import { FilterInterface } from "../../../interfaces/filter.interface.ts";
import { MySelect } from "../../atoms/form";
import { ListFilterIcon, ListFilterPlusIcon, RotateCcw } from "lucide-react";
import useMediaQuerySizes from "../../../hooks/useMediaQuerySizes.tsx";

interface FilterWrapperProps extends ButtonProps {
  filters: FilterInterface[];
  onFilter?: (filters: Record<string, unknown>) => void;
  onCancel?: () => void;
  onChange?: (filters: FieldValues) => void;
}

const FilterWrapper = memo(function FilterWrapper({
  filters,
  onFilter,
  onChange,
  onCancel,
  ...btnProps
}: FilterWrapperProps) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const { sm } = useMediaQuerySizes();
  const {
    handleSubmit,
    register,
    getValues,
    handleSetParams,
    params,
    watch,
    reset,
  } = useFilter();

  useEffect(() => {
    let hasFilter = false;
    filters.forEach((filter) => {
      const value = get(params, filter.name);
      if (Array.isArray(value) ? value.length > 0 : Boolean(value)) {
        hasFilter = true;
      }
    });
    setIsFiltered(hasFilter);
  }, [filters, params]);

  useEffect(() => {
    if (onChange) {
      onChange(getValues());
    }
  }, [watch()]);

  const handleFilter = (data = {}) => {
    const cleanedFilters = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== null && value !== "",
      ),
    );
    if (onFilter) {
      onFilter(cleanedFilters);
    }
    handleSetParams(cleanedFilters);
    setShow(false);
  };

  const handleReset = () => {
    handleSetParams({});
    const defaultValues = Object.fromEntries(
      filters.map((filter) => [filter.name, ""]),
    );
    reset(defaultValues);
    if (onFilter) {
      onFilter({});
    }
    setIsFiltered(false);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setShow(false);
  };

  const popover = (
    <div className="flex items-center gap-2">
      {isFiltered && (
        <Tooltip content={t("clear")}>
          <RotateCcw
            type="button"
            onClick={handleReset}
            size={18}
            className={"dark:text-white"}
          />
        </Tooltip>
      )}
      <Popover
        open={show}
        content={
          <form
            className="position-relative min-w-[300px] p-3"
            onSubmit={handleSubmit(handleFilter)}
          >
            <div className="h-full shrink overflow-y-auto p-1">
              {filters.map((filter) => (
                <MySelect
                  key={filter.name}
                  register={register}
                  multiple={filter.isMulti}
                  name={filter.name}
                  options={filter.options}
                  label={filter.label}
                  className="mb-3"
                />
              ))}
            </div>
            <div className="flex shrink-0 justify-end gap-3 p-1 pt-3">
              <Button
                color="gray"
                type="button"
                size="sm"
                onClick={handleCancel}
              >
                {t("Cancel")}
              </Button>
              <Button color="blue" type="submit" size="sm">
                {t("Save")}
              </Button>
            </div>
          </form>
        }
        placement="bottom-end"
      >
        <Button
          size="md"
          type="button"
          color="blue"
          {...btnProps}
          onClick={() => setShow(!show)}
        >
          {isFiltered ? (
            <ListFilterPlusIcon size={20} />
          ) : (
            <ListFilterIcon size={20} />
          )}
          {sm && t("Filter")}
        </Button>
      </Popover>
    </div>
  );

  return !sm ? <Tooltip content={t("Filter")}>{popover}</Tooltip> : popover;
});

export default FilterWrapper;
