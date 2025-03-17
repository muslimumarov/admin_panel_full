import { Language } from "../../../core/enums/Language.ts";
import { LANGUAGES } from "../../../core/constants/langulage.constants.ts";
import { Tabs } from "flowbite-react";
import {
  MyHtmlEditor,
  MyInput,
} from "../../../core/components/atoms/form/index.ts";
import get from "lodash/get";
import MyTabs from "../../../core/components/atoms/tab/MyTab.tsx";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

interface TitleContentTranslationProps<TData extends FieldValues> {
  register: UseFormRegister<TData>;
  control?: Control<TData>;
  hasContent?: boolean;
  errors?: FieldErrors<TData>;
}

const TitleContentTranslation = <TData extends FieldValues>({
  register,
  control,
  errors,
  hasContent = false,
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
              className={"mb-3"}
              error={
                get(errors, `translations.${index}.fullname.message`) as string
              }
              label={`${t("fullName")} (${value})`}
              register={register}
              name={`translations.${index}.fullname` as Path<TData>}
            />
            <MyInput<TData>
              error={
                get(errors, `translations.${index}.fullname.message`) as string
              }
              label={`${t("appointmentTime")} (${value})`}
              register={register}
              name={`translations.${index}.acceptance` as Path<TData>}
              placeholder={t("weeklyThursday", { lang: value })}
            />
          </div>
          {hasContent && (
            <MyHtmlEditor<TData>
              required
              error={
                get(errors, `translations.${index}.tasks.message`) as string
              }
              label={`${t("responsibilities")} (${value})`}
              control={control}
              name={`translations.${index}.tasks` as Path<TData>}
            />
          )}
        </Tabs.Item>
      ))}
    </MyTabs>
  );
};

export default TitleContentTranslation;
