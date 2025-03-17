import useManagementForm from "../hooks/useManagementForm.ts";
import {
  MyFilePond,
  MySelect,
  MyInput,
} from "../../../core/components/atoms/form";
import { useTranslation } from "react-i18next";
import { ManagementFormType } from "../schemas/createManagementSchema.ts";
import FormContainer from "../../../core/components/templates/form/FormContainer.tsx";
import TitleContentTranslation from "../form/TitleContentTranslation.tsx";
import useDepartments from "../hooks/useDepartments.ts";
import usePositions from "../hooks/usePosition.ts";
import useSections from "../hooks/useSection.ts";
import MyInputMask from "../../../core/components/atoms/form/MyInputMask.tsx";

const Form = () => {
  const { t } = useTranslation();
  const { handleSubmit, errors, register, control, id, onSubmit, watch } =
    useManagementForm();
  const { departments } = useDepartments();
  const { positions } = usePositions();
  const { sections } = useSections({
    departmentId: watch("departmentId"),
  });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      title={id ? t("editControlWithoutDepartment") : t("addControl")}
    >
      <div className={"flex w-full flex-col gap-3 2xl:flex-row"}>
        <div className={"flex-[1]"}>
          <div className={"mb-5"}>
            <MyFilePond<ManagementFormType>
              required
              maxFiles={1}
              control={control}
              name={"avatar"}
              error={errors.avatar?.message}
              placeholder={t("uploadPoster") + " (PNG, JPG, JPEG, GIF, SVG)"}
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
            <MySelect<ManagementFormType>
              required
              error={errors.departmentId?.message}
              label={t("department")}
              register={register}
              name={"departmentId"}
              options={[{ label: t("Without"), value: -1 }, ...departments]}
            />
          </div>
          <div className={"mb-5"}>
            <MySelect<ManagementFormType>
              required
              error={errors.sectionId?.message}
              label={t("section")}
              register={register}
              name={"sectionId"}
              options={[{ label: t("noSection"), value: -1 }, ...sections]}
            />
          </div>
          <div className={"mb-5"}>
            <MySelect<ManagementFormType>
              required
              error={errors.positionId?.message}
              label={t("position")}
              register={register}
              name={"positionId"}
              options={positions}
            />
          </div>
          <div className={"mb-5"}>
            <MyInputMask
              mask={"+\\9\\98 (99) 999-99-99"}
              register={register}
              name="phone"
              label={t("phone_number")}
              rules={{ required: t("phoneNumberRequired") }}
              error={errors.phone?.message}
              required
            />
          </div>
          <div className={"mb-5"}>
            <MyInput<ManagementFormType>
              required
              error={errors.email?.message}
              label={t("Email")}
              register={register}
              name={"email"}
              type="email"
            />
          </div>
        </div>
        <div className={"flex-[2]"}>
          <TitleContentTranslation<ManagementFormType>
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
