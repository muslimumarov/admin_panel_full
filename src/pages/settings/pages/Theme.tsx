import { PageTitle } from "../../../core/components/atoms/title";
import { useTranslation } from "react-i18next";

const Theme = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageTitle title={t("Mavzular")} />
    </>
  );
};

export default Theme;
