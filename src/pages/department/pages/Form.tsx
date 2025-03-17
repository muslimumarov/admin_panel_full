import useDepartmentForm from "../hooks/useDepartmentForm.ts";
import { useTranslation } from "react-i18next";
import { DepartmentFormType } from "../schemas/createDepartmentSchema.ts";
import FormContainer from "../../../core/components/templates/form/FormContainer.tsx";
import { TitleContentTranslation } from "../../../core/components/templates/form";

const Form = () => {
  const { t } = useTranslation();
  const { handleSubmit, errors, register, id, onSubmit } = useDepartmentForm();

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      title={id ? t("editDepartment") : t("addDepartment")}
    >
      <div className={"flex w-full flex-col gap-3 2xl:flex-row"}>
        <div className={"w-full"}>
          <TitleContentTranslation<DepartmentFormType>
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </FormContainer>
  );
};

export default Form;
