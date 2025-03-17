import {
  MyFilePond,
  MyInput,
  MySelect,
} from "../../../core/components/atoms/form";
import { useTranslation } from "react-i18next";
import useRecommendationForm from "../hooks/useRecommendationForm.ts";
import { RecommendationFormType } from "../schemas/createRecommendationSchema.ts";
import { RecommendationCategory } from "../enums/RecommendationCategory.ts";
import TitleContentTranslation from "../templates/form/TitleContentTranslation.tsx";
import FormContainer from "../../../core/components/templates/form/FormContainer.tsx";
import { RecommendationStatus } from "../enums/RecommendationStatus.ts";

const Form = () => {
  const { t } = useTranslation();
  const { handleSubmit, errors, register, control, id, onSubmit } =
    useRecommendationForm();

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      title={id ? t("editRecommendation") : t("addRecommendation")}
    >
      <div className={"flex w-full flex-col gap-3 2xl:flex-row"}>
        <div className={"flex-[1]"}>
          <div className={"mb-5"}>
            <MyFilePond<RecommendationFormType>
              required
              maxFiles={1}
              control={control}
              name={"image"}
              error={errors.image?.message}
              placeholder={
                t("uploadRecommendationImage") + " (PNG, JPG, JPEG, GIF, SVG)"
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
            <MyInput<RecommendationFormType>
              required
              error={errors.tags?.message}
              label={t("Tag")}
              register={register}
              placeholder={t("political")}
              name={"tags"}
            />
          </div>
          <div className={"mb-5"}>
            <MySelect<RecommendationFormType>
              required
              error={errors.category?.message}
              label={t("NewsCategories")}
              register={register}
              name={"category"}
              options={[
                {
                  label: t("Professional"),
                  value: RecommendationCategory.PROFESSIONAL,
                },
                {
                  label: t("educational"),
                  value: RecommendationCategory.EDUCATIONAL,
                },
                {
                  label: t("personalCategory"),
                  value: RecommendationCategory.PERSONAL,
                },
              ]}
            />
          </div>
          <div className={"mb-5"}>
            <MySelect<RecommendationFormType>
              required
              error={errors.status?.message}
              label={t("status")}
              register={register}
              name={"status"}
              options={[
                {
                  label: t("Active"),
                  value: RecommendationStatus.ACTIVE,
                },
                {
                  label: t("Inactive"),
                  value: RecommendationStatus.INACTIVE,
                },
              ]}
            />
          </div>
        </div>
        <div className={"flex-[2]"}>
          <TitleContentTranslation<RecommendationFormType>
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
