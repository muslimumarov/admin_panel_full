import {
  MyFilePond,
  MyInput,
  MySelect,
} from "../../../core/components/atoms/form";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../core/components/templates/form/FormContainer.tsx";
import useUserForm from "../hooks/useUserForm.ts";
import { ManagementFormType } from "../schemas/createManagementSchema.ts";
import { UserRole } from "../enums/UserRole.ts";

const Form = () => {
  const { t } = useTranslation();
  const { handleSubmit, errors, register, control, id, onSubmit } =
    useUserForm();
  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      title={id ? t("editUser") : t("addUser")}
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
              placeholder={t("uploadUserImage") + " (PNG, JPG, JPEG, GIF, SVG)"}
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
            <MyInput<ManagementFormType>
              required
              error={errors.username?.message}
              label={t("username")}
              register={register}
              placeholder={t("username")}
              name={"username"}
            />
          </div>
          <div className={"mb-5"}>
            <MyInput<ManagementFormType>
              required
              error={errors.email?.message}
              label={t("Email")}
              register={register}
              placeholder={t("Email")}
              name={"email"}
            />
          </div>
          <div className={"mb-5"}>
            <MyInput<ManagementFormType>
              required
              error={errors.password?.message}
              label={t("password")}
              register={register}
              placeholder={t("password")}
              name={"password"}
            />
          </div>
          <div className="mb-5">
            <MySelect<ManagementFormType>
              required
              error={errors.role?.message}
              label={t("role")}
              register={register}
              name="role"
              options={[
                { label: t("SUPER_ADMIN"), value: UserRole.SUPER_ADMIN },
                { label: t("CONTENT"), value: UserRole.CONTENT },
                { label: t("ACCOUNTING"), value: UserRole.ACCOUNTING },
                { label: t("MONITORING"), value: UserRole.MONITORING },
              ]}
            />
          </div>
        </div>
      </div>
    </FormContainer>
  );
};

export default Form;
