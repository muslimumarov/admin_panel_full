import {
  MyFilePond,
  MyInput,
  MySelect,
} from "../../../core/components/atoms/form";
import { useTranslation } from "react-i18next";
import { ServicesFormType } from "../schemas/createServicesSchema.ts";
import useServicesForm from "../hooks/useServicesForm.ts";
import { FormContainer } from "../../../core/components/templates/form";
import TitleContentTranslation from "../templates/form/TitleContentTranslation.tsx";
import { ServicesStatus } from "../enums/ServicesStatus.ts";
import { FieldError } from "react-hook-form";
import { Plus, X } from "lucide-react";
import useMediaQuerySizes from "../../../core/hooks/useMediaQuerySizes.tsx";
import { Button, ToggleSwitch } from "flowbite-react";
import MyInputMask from "../../../core/components/atoms/form/MyInputMask.tsx";

const Form = () => {
  const { t } = useTranslation();
  const { sm } = useMediaQuerySizes();
  const {
    handleSubmit,
    errors,
    register,
    control,
    id,
    onSubmit,
    watch,
    setValue,
    fields,
    append,
    remove,
  } = useServicesForm();

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      title={id ? t("EditService") : t("AddService")}
    >
      <div className={"flex w-full flex-col gap-3 2xl:flex-row"}>
        <div className={"flex-[1]"}>
          <div className={"mb-5"}>
            <MyFilePond<ServicesFormType>
              required
              maxFiles={1}
              control={control}
              name={"logo"}
              error={errors.logo?.message}
              placeholder={
                t("uploadPosterImage") + " (PNG, JPG, JPEG, GIF, SVG)"
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
            <MyFilePond<ServicesFormType>
              required
              maxFiles={10}
              isMulti
              control={control}
              name={"documents"}
              error={errors.documents?.message}
              placeholder={t("upload_file")}
            />
          </div>
          <div className={"mb-5"}>
            <MyInput<ServicesFormType>
              required
              error={errors.tags?.message}
              label={t("Tag")}
              register={register}
              placeholder={"software"}
              name={"tags"}
            />
          </div>
          <div className={"mb-5"}>
            <MyInput<ServicesFormType>
              required
              error={errors.price?.message}
              label={t("price")}
              register={register}
              placeholder={"1000$ , ..."}
              name={"price"}
            />
          </div>
          <div className={"mb-5"}>
            <MyInputMask
              mask={"+\\9\\98 (99) 999-99-99"}
              register={register}
              name="contactInfo"
              label="phone_number"
              error={errors.contactInfo?.message}
              required
            />
          </div>

          <div className={"mb-5"}>
            <MySelect<ServicesFormType>
              required
              error={errors.status?.message}
              label={t("Status")}
              register={register}
              name={"status"}
              options={[
                {
                  label: t("Active"),
                  value: ServicesStatus.ACTIVE,
                },
                {
                  label: t("Inactive"),
                  value: ServicesStatus.INACTIVE,
                },
              ]}
            />
          </div>

          <div className="mb-10">
            <label className="mb-2 block text-gray-700">
              {t("order_form")}
            </label>
            {fields.map((field, index) => (
              <div
                key={field.key}
                className="mb-8 flex flex-col gap-5 md:flex-row md:items-center"
              >
                <div className="w-full md:w-1/3">
                  <MyInput<ServicesFormType>
                    required
                    error={errors?.orderSchemaFields?.[index]?.name?.message}
                    label={t("data_name")}
                    register={register}
                    name={`orderSchemaFields.${index}.name`}
                    placeholder={t("enter_data_name")}
                  />
                </div>

                <div className="w-full md:w-1/3">
                  <MySelect
                    required
                    color="blue"
                    error={
                      (errors?.orderSchemaFields?.[index]?.type as FieldError)
                        ?.message
                    }
                    label={t("data_type")}
                    register={register}
                    name={`orderSchemaFields.${index}.type`}
                    options={[
                      { label: t("text"), value: "string" },
                      { label: t("number"), value: "number" },
                      { label: t("document"), value: "string" },
                    ]}
                  />
                </div>

                <div className="mt-0 flex w-full items-center justify-between md:mt-7 md:w-1/3">
                  <ToggleSwitch
                    id={`orderSchemaFields.${index}.required`}
                    label={t("required")}
                    checked={!!watch(`orderSchemaFields.${index}.required`)}
                    onChange={(value) =>
                      setValue(`orderSchemaFields.${index}.required`, value)
                    }
                    theme={{
                      toggle: {
                        checked: {
                          color: {
                            blue: "border-blue-700 bg-blue-700",
                          },
                        },
                      },
                    }}
                  />
                  <Button
                    className="ml-2 flex size-10 items-center justify-center border-0 p-0"
                    color="red"
                    onClick={() => remove(index)}
                  >
                    <X size={15} />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              className={"mt-2"}
              color={"blue"}
              onClick={() =>
                append({ name: "", type: "string", required: false })
              }
            >
              <Plus size={20} /> {sm && t("add_information")}
            </Button>
          </div>
          {/*  --------------*/}
        </div>
        <div className={"flex-[2]"}>
          <TitleContentTranslation<ServicesFormType>
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
