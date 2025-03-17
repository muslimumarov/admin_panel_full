import { HTMLAttributes, ReactNode } from "react";
import { PageTitle } from "../../atoms/title";
import { Button, Tooltip } from "flowbite-react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useMediaQuerySizes from "../../../hooks/useMediaQuerySizes.tsx";

interface FormContainerProps
  extends Omit<HTMLAttributes<HTMLFormElement>, "title"> {
  title?: ReactNode;
}

const FormContainer = ({
  className,
  title,
  children,
  ...props
}: FormContainerProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { sm } = useMediaQuerySizes();

  return (
    <form
      {...props}
      className={
        "flex flex-col gap-3 rounded-lg bg-white px-3 pt-3 dark:bg-dark-secondary"
      }
    >
      <div className={"flex justify-between gap-3"}>
        <PageTitle title={title} />
        <div className={"flex gap-3"}>
          <Tooltip content={t("Back")}>
            <Button color={"light"} onClick={() => navigate(-1)}>
              {sm && t("Back")} <ArrowRight size={20} />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className={"flex flex-col gap-3 2xl:flex-row"}>{children}</div>
      <div
        className={
          "sticky -bottom-4 flex w-full justify-end gap-3 border-t border-gray-300 bg-white py-3  dark:bg-dark-secondary"
        }
      >
        <Button onClick={() => navigate(-1)} color={"light"}>
          {t("Cancel")}
        </Button>
        <Button color={"blue"} type={"submit"}>
          {t("Save")}
        </Button>
      </div>
    </form>
  );
};
export default FormContainer;
