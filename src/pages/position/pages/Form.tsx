import usePositionForm from "../hooks/usePositionForm.ts";
import { useTranslation } from "react-i18next";
import { TitleContentTranslation } from "../../../core/components/templates/form";
import FormContainer from "../../../core/components/templates/form/FormContainer.tsx";
import { PositionFormType } from "../schemas/createPositionSchema.ts";
const Form = () => {
  const { t } = useTranslation();
  const { handleSubmit, errors, register, id, onSubmit } = usePositionForm();

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      title={id ? t("editPosition") : t("addPosition")}
    >
      <div className={"flex w-full flex-col gap-3 2xl:flex-row"}>
        <div className={"w-full"}>
          <TitleContentTranslation<PositionFormType>
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </FormContainer>
  );
};

export default Form;
