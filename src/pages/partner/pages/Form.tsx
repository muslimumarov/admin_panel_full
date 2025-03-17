import usePartnerForm from "../hooks/usePartnerForm.ts";
import { MyFilePond, MyInput } from "../../../core/components/atoms/form";
import { useTranslation } from "react-i18next";
import { PartnerFormType } from "../schemas/createPartnerSchema.ts";
import FormContainer from "../../../core/components/templates/form/FormContainer.tsx";
import PartnerOrganizationTranslation from "../components/PartnerOrganizationTranslation.tsx";

const Form = () => {
  const { t } = useTranslation();
  const { handleSubmit, errors, register, control, id, onSubmit } =
    usePartnerForm();
  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      title={id ? t("editPartners") : t("addPartners")}
    >
      <div className={"flex w-full flex-col gap-3 2xl:flex-row"}>
        <div className={"flex-[1]"}>
          <div className={"mb-5"}>
            <MyFilePond<PartnerFormType>
              required
              maxFiles={1}
              control={control}
              name={"logo"}
              error={errors.logo?.message}
              placeholder={
                t("uploadPartnerImage") + " (PNG, JPG, JPEG, GIF, SVG)"
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
            <MyInput<PartnerFormType>
              required
              error={errors.url?.message}
              label={t("URL")}
              register={register}
              placeholder={"link"}
              name={"url"}
            />
          </div>
          <div className={"mb-5"}>
            <PartnerOrganizationTranslation<PartnerFormType>
              register={register}
              errors={errors}
              control={control}
              hasContent
            />
          </div>
        </div>
      </div>
    </FormContainer>
  );
};

export default Form;
