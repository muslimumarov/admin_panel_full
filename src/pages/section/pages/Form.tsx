import { MySelect } from "../../../core/components/atoms/form";
import { useTranslation } from "react-i18next";
import useDepartments from "../hooks/useDepartments.ts";
import { TitleContentTranslation } from "../../../core/components/templates/form";
import FormContainer from "../../../core/components/templates/form/FormContainer.tsx";
import useSectionForm from "../hooks/useSectionForm.ts";
import { SectionFormType } from "../schemas/createSectionSchema.ts";

const Form = () => {
  const { t } = useTranslation();
  const { handleSubmit, errors, register, id, onSubmit } = useSectionForm();
  const { departments } = useDepartments();

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      title={id ? t("editSection") : t("addSection")}
    >
      <div className={"flex w-full flex-col gap-3 2xl:flex-row"}>
        <div className={"flex-[1]"}>
          <div className={"mb-5"}>
            <MySelect<SectionFormType>
              error={errors.departmentId?.message}
              label={t("department")}
              register={register}
              name={"departmentId"}
              options={[
                { label: t("noDepartment"), value: -1 },
                ...departments,
              ]}
            />
          </div>
          <div className={"flex-[2]"}>
            <TitleContentTranslation<SectionFormType>
              register={register}
              errors={errors}
            />
          </div>
        </div>
      </div>
    </FormContainer>
  );
};

export default Form;
