import {
  MyFilePond,
  MyInput,
  MySelect,
} from "../../../core/components/atoms/form";
import { useTranslation } from "react-i18next";
import { ArticlesFormType } from "../schemas/createArticlesSchema.ts";
import FormContainer from "../../../core/components/templates/form/FormContainer.tsx";
import { ArticlesStatus } from "../enums/ArticlesStatus.ts";
import useArticlesForm from "../hooks/useArticlesForm.ts";
import { TitleContentTranslation } from "../../../core/components/templates/form";

const Form = () => {
  const { t } = useTranslation();
  const { handleSubmit, errors, register, control, id, onSubmit } =
    useArticlesForm();

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      title={id ? t("editArticle") : t("addArticle")}
    >
      <div className={"flex w-full flex-col gap-3 2xl:flex-row"}>
        <div className={"flex-[1]"}>
          <div className={"mb-5"}>
            <MyFilePond<ArticlesFormType>
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
            <MyInput<ArticlesFormType>
              required
              error={errors.tags?.message}
              label={t("Tag")}
              register={register}
              placeholder={"political"}
              name={"tags"}
            />
          </div>
          <div className={"mb-5"}>
            <MySelect<ArticlesFormType>
              required
              error={errors.status?.message}
              label={t("status")}
              register={register}
              name={"status"}
              options={[
                {
                  label: t("published"),
                  value: ArticlesStatus.PUBLISHED,
                },
                {
                  label: t("unpublished"),
                  value: ArticlesStatus.DRAFT,
                },
              ]}
            />
          </div>
        </div>
        <div className={"flex-[2]"}>
          <TitleContentTranslation<ArticlesFormType>
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
