import { Dropdown } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../../core/constants/langulage.constants.ts";
import { Language } from "../../../core/enums/Language.ts";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <Dropdown
      placement="bottom-end"
      inline
      renderTrigger={() => (
        <img
          src={`/images/${i18n.language}.png`}
          alt={""}
          width={20}
          height={20}
        />
      )}
    >
      {LANGUAGES.map((lang) => (
        <Dropdown.Item
          key={lang.value}
          onClick={() => i18n.changeLanguage(lang.value as Language)}
        >
          {lang.label}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default LanguageSelector;
