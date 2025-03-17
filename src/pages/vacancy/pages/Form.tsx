import useVacancyForm from "../hooks/useVacancyForm.ts";
import { MyInput, MySelect } from "../../../core/components/atoms/form";
import { useTranslation } from "react-i18next";
import { VacancyFormType } from "../schemas/createVacancySchema.ts";
import { VacancyStatus } from "../enums/VacancyStatus.ts";
import FormContainer from "../../../core/components/templates/form/FormContainer.tsx";
import VacancyTitleContentTranslation from "../templates/form/VacancyTitleContentTranslation.tsx";

const Form = () => {
  const { t } = useTranslation();
  const { handleSubmit, errors, register, control, id, onSubmit } =
    useVacancyForm();
  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      title={id ? t("editVacancies") : t("addVacancies")}
    >
      <div className={"flex w-full flex-col gap-3 2xl:flex-row"}>
        <div className={"flex-[1]"}>
          <div className={"mb-5"}>
            <MyInput<VacancyFormType>
              required
              error={errors.skills?.message}
              label={t("skills")}
              register={register}
              placeholder={"skills"}
              name={"skills"}
            />
          </div>
          <div className={"mb-5"}>
            <MyInput<VacancyFormType>
              required
              error={errors.salary?.message}
              label={t("salary")}
              register={register}
              placeholder={"salary"}
              name={"salary"}
            />
          </div>
          <div className={"mb-5"}>
            <MySelect<VacancyFormType>
              required
              error={errors.employmentType?.message}
              label={t("employmentType")}
              register={register}
              name="employmentType"
              options={[
                { label: t("fullTime"), value: "FULL_TIME" },
                { label: t("partTime"), value: "PART_TIME" },
                { label: t("remote"), value: "REMOTE" },
                { label: t("contract"), value: "CONTRACT" },
              ]}
            />
          </div>
          <div className={"mb-5"}></div>
          <div className={"mb-5"}>
            <MySelect<VacancyFormType>
              required
              error={errors.status?.message}
              label={t("status")}
              register={register}
              name={"status"}
              options={[
                {
                  label: t("active"),
                  value: VacancyStatus.ACTIVE,
                },
                {
                  label: t("inactive"),
                  value: VacancyStatus.INACTIVE,
                },
              ]}
            />
          </div>
        </div>
        <div className={"flex-[2]"}>
          <VacancyTitleContentTranslation<VacancyFormType>
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
