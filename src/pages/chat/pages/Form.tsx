import useChatForm from "../hooks/useChatForm.ts";
import { MyHtmlEditor, MyInput } from "../../../core/components/atoms/form";
import { useTranslation } from "react-i18next";
import { Button, Tabs, Tooltip } from "flowbite-react";
import { Language } from "../../../core/enums/Language.ts";
import MyTabs from "../../../core/components/atoms/tab/MyTab.tsx";
import { LANGUAGES } from "../../../core/constants/langulage.constants.ts";
import { PageTitle } from "../../../core/components/atoms/title";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import useMediaQuerySizes from "../../../core/hooks/useMediaQuerySizes.tsx";
import get from "lodash/get";
import { ChatFormType } from "../schemas/createChatSchema.ts";

const Form = () => {
  const { t } = useTranslation();
  const { handleSubmit, errors, register, control, id, onSubmit } =
    useChatForm();
  const navigate = useNavigate();
  const { sm } = useMediaQuerySizes();

  return (
    <div>
      <form
        className={"flex flex-col gap-3 rounded-lg bg-white p-3"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={"flex items-center justify-between gap-3"}>
          <PageTitle title={id ? t("editNews") : t("AddNews")} />
          <div className={"flex justify-end gap-3"}>
            <Tooltip content={t("back")}>
              <Button color={"light"} onClick={() => navigate(-1)}>
                {sm && t("back")} <ArrowRight size={20} />
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className={"flex flex-col gap-3 2xl:flex-row"}>
          <div className={"flex-[1]"}></div>
          <div className={"flex-[2]"}>
            <MyTabs
              variant={"underline"}
              className={"gap-0"}
              defaultValue={Language.UZ}
            >
              {LANGUAGES.map(({ value, label }, index) => (
                <Tabs.Item key={value} title={label}>
                  <div className={"mb-5"}>
                    <MyInput<ChatFormType>
                      required
                      error={get(errors, `translations.${index}.title.message`)}
                      label={t("Sarlavha ({{lang}})", { lang: value })}
                      register={register}
                      name={`translations.${index}.title`}
                    />
                  </div>
                  <div className={""}>
                    <MyHtmlEditor<ChatFormType>
                      className={""}
                      required
                      error={get(
                        errors,
                        `translations.${index}.content.message`,
                      )}
                      label={t("Ta'rif ({{lang}})", { lang: value })}
                      control={control}
                      name={`translations.${index}.content`}
                    />
                  </div>
                </Tabs.Item>
              ))}
            </MyTabs>
          </div>
        </div>
        <div
          className={
            " flex w-full justify-end gap-3 border-t border-gray-300 bg-white pt-3"
          }
        >
          <Button onClick={() => navigate(-1)} color={"light"}>
            {t("Bekor qilish")}
          </Button>
          <Button color={"blue"} type={"submit"}>
            {t("Saqlash")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
