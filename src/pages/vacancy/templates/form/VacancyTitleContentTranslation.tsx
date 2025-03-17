import { Language } from "../../../../core/enums/Language.ts";
import { LANGUAGES } from "../../../../core/constants/langulage.constants.ts";
import { Tabs } from "flowbite-react";
import {
  MyHtmlEditor,
  MyInput,
} from "../../../../core/components/atoms/form/index.ts";
import get from "lodash/get";
import MyTabs from "../../../../core/components/atoms/tab/MyTab.tsx";
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

const VacancyTitleContentTranslation = <TData extends FieldValues>({
  register,
  control,
  errors,
  // hasContent = false,
}: TitleContentTranslationProps<TData>) => {
  const { t } = useTranslation();

  return (
    <MyTabs variant="underline" className="gap-0" defaultValue={Language.UZ}>
      {LANGUAGES.map(({ value, label }, index) => (
        <Tabs.Item key={value} title={label}>
          <div className="mb-5 space-y-6">
            {/* Inputlar 2 ustunda */}
            <div className="grid grid-cols-1 gap-4">
              <MyInput<TData>
                defaultValue={value || ""}
                type={"hidden"}
                register={register}
                name={`translations.${index}.language` as Path<TData>}
              />
              <MyInput<TData>
                required
                error={
                  get(errors, `translations.${index}.title.message`) as string
                }
                label={`${t("Title")} (${value})`}
                register={register}
                name={`translations.${index}.title` as Path<TData>}
              />
              <MyInput<TData>
                required
                error={
                  get(
                    errors,
                    `translations.${index}.location.message`,
                  ) as string
                }
                label={`${t("location")} (${value})`}
                register={register}
                name={`translations.${index}.location` as Path<TData>}
              />
            </div>

            <MyHtmlEditor<TData>
              required
              error={
                get(
                  errors,
                  `translations.${index}.requirements.message`,
                ) as string
              }
              label={`${t("requirements")} (${value})`}
              control={control}
              name={`translations.${index}.requirements` as Path<TData>}
            />
            <MyHtmlEditor<TData>
              required
              error={
                get(
                  errors,
                  `translations.${index}.responsibilities.message`,
                ) as string
              }
              label={`${t("responsibilities")} (${value})`}
              control={control}
              name={`translations.${index}.responsibilities` as Path<TData>}
            />
            <MyHtmlEditor<TData>
              required
              error={
                get(
                  errors,
                  `translations.${index}.workConditions.message`,
                ) as string
              }
              label={`${t("work_conditions")} (${value})`}
              control={control}
              name={`translations.${index}.workConditions` as Path<TData>}
            />
          </div>
        </Tabs.Item>
      ))}
    </MyTabs>
  );
};

export default VacancyTitleContentTranslation;
