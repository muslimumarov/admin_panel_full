import useDocumentsForm from "../hooks/useDocumentsForm.ts";
import {
  MyFilePond,
  MyInput,
  MySelect,
} from "../../../core/components/atoms/form";
import { useTranslation } from "react-i18next";
import { DocumentFormType } from "../schemas/createDocumentsSchema.ts";
import { DocumentsStatus } from "../enums/DocumentsStatus.ts";
import DocumentTitleContentTranslation from "../components/DocumentTitleContentTranslation.tsx";
import FormContainer from "../../../core/components/templates/form/FormContainer.tsx";

const Form = () => {
  const { t } = useTranslation();
  const { handleSubmit, errors, register, control, id, onSubmit, categories } =
    useDocumentsForm();

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      title={id ? t("documentEdit") : t("documentCreate")}
    >
      <div className={"flex w-full flex-col gap-3 2xl:flex-row"}>
        <div className={"flex-[1]"}>
          <div className={"mb-5"}>
            <MyFilePond<DocumentFormType>
              required
              maxFiles={10}
              isMulti
              control={control}
              name={"files"}
              error={errors.files?.message}
              placeholder={t("uploadFile")}
            />
          </div>
          <div className={"mb-5"}>
            <MyInput<DocumentFormType>
              required
              error={errors.tags?.message}
              label={t("Tag")}
              register={register}
              placeholder={"Tag"}
              name={"tags"}
            />
          </div>
          <div className={"mb-5"}>
            <MySelect<DocumentFormType>
              required
              error={errors.category?.message}
              label={t("category")}
              register={register}
              name={"category"}
              options={categories}
            />
          </div>
          <div className={"mb-5"}>
            <MySelect<DocumentFormType>
              required
              error={errors.status?.message}
              label={t("status")}
              register={register}
              name={"status"}
              options={[
                {
                  label: t("published"),
                  value: DocumentsStatus.PUBLISHED,
                },
                {
                  label: t("unpublished"),
                  value: DocumentsStatus.DRAFT,
                },
              ]}
            />
          </div>
        </div>
        <div className={"flex-[2]"}>
          <DocumentTitleContentTranslation<DocumentFormType>
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
