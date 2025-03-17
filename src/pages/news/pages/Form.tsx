import useNewsForm from "../hooks/useNewsForm.ts";
import {
  MyFilePond,
  MyInput,
  MySelect,
} from "../../../core/components/atoms/form";
import { useTranslation } from "react-i18next";
import { NewsFormType } from "../schemas/createNewsSchema.ts";
import { NewsStatus } from "../enums/NewsStatus.ts";
import useCategories from "../../../core/hooks/useCategories.ts";
import { TitleContentTranslation } from "../../../core/components/templates/form";
import FormContainer from "../../../core/components/templates/form/FormContainer.tsx";

const Form = () => {
  const { t } = useTranslation();
  const { handleSubmit, errors, register, control, id, onSubmit } =
    useNewsForm();
  const { categories } = useCategories();
  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      title={id ? t("EditCategory") : t("AddCategory")}
    >
      <div className={"flex w-full flex-col gap-3 2xl:flex-row"}>
        <div className={"flex-[1]"}>
          <div className={"mb-5"}>
            <MyFilePond<NewsFormType>
              required
              maxFiles={1}
              control={control}
              name={"image"}
              error={errors.image?.message}
              placeholder={
                t("uploadPosterImage") + " (PNG, JPG, JPEG, GIF, SVG)"
              }
              accept={[
                "image/png",
                "image/jpeg",
                "image/gif",
                "image/jpg",
                "image/svg+xml",
              ]}
            />
          </div>
          <div className={"mb-5"}>
            <MyInput<NewsFormType>
              required
              error={errors.tags?.message}
              label={t("Tag")}
              register={register}
              placeholder={"political"}
              name={"tags"}
            />
          </div>
          <div className={"mb-5"}>
            <MySelect<NewsFormType>
              required
              error={errors.categoryId?.message}
              label={t("NewsCategories")}
              register={register}
              name={"categoryId"}
              options={categories}
            />
          </div>
          <div className={"mb-5"}>
            <MySelect<NewsFormType>
              required
              error={errors.status?.message}
              label={t("Status")}
              register={register}
              name={"status"}
              options={[
                {
                  label: t("published"),
                  value: NewsStatus.PUBLISHED,
                },
                {
                  label: t("unpublished"),
                  value: NewsStatus.DRAFT,
                },
              ]}
            />
          </div>
        </div>
        <div className={"flex-[2]"}>
          <TitleContentTranslation<NewsFormType>
            register={register}
            errors={errors}
            control={control}
            hasContent
          />
        </div>
      </div>
    </FormContainer>
  );
};

export default Form;
