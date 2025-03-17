import useCategoryForm from "../hooks/useCategoryForm.ts";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../core/components/templates/form/FormContainer.tsx";
import { TitleContentTranslation } from "../../../core/components/templates/form";
import { CategoryFormType } from "../schemas/createCategorySchema.ts";

const Form = () => {
  const { t } = useTranslation();
  const { handleSubmit, errors, register, id, onSubmit } = useCategoryForm();

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      title={id ? t("EditCategory") : t("AddCategory")}
    >
      <div className={"flex w-full flex-col gap-3 2xl:flex-row"}>
        <div className={"w-full"}>
          <TitleContentTranslation<CategoryFormType>
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </FormContainer>
  );
};

export default Form;
