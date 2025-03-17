import { Tabs } from "flowbite-react";
import get from "lodash/get";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MyTabs } from "../../../core/components/atoms/tab";
import { LANGUAGES } from "../../../core/constants/langulage.constants.ts";
import { MyInput } from "../../../core/components/atoms/form";
import { Language } from "../../../core/enums/Language.ts";

interface TitleContentTranslationProps<TData extends FieldValues> {
  register: UseFormRegister<TData>;
  control?: Control<TData>;
  hasContent?: boolean;
  errors?: FieldErrors<TData>;
}

const PartnerOrganizationTranslation = <TData extends FieldValues>({
  register,
  errors,
}: TitleContentTranslationProps<TData>) => {
  const { t } = useTranslation();

  return (
    <MyTabs
      variant={"underline"}
      className={"gap-0"}
      defaultValue={Language.UZ}
    >
      {LANGUAGES.map(({ value, label }, index) => (
        <Tabs.Item key={value} title={label}>
          <div className={"mb-5"}>
            <MyInput<TData>
              defaultValue={value || ""}
              type={"hidden"}
              register={register}
              name={`translations.${index}.language` as Path<TData>}
            />
            <MyInput<TData>
              required
              error={
                get(
                  errors,
                  `translations.${index}.organization.message`,
                ) as string
              }
              label={`${t("title")} (${value})`}
              register={register}
              name={`translations.${index}.organization` as Path<TData>}
            />
          </div>
        </Tabs.Item>
      ))}
    </MyTabs>
  );
};

export default PartnerOrganizationTranslation;
