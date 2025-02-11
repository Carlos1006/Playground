import { FC, useLayoutEffect } from "react";
import css from "../styles/language.module.scss";
import useHomeContext from "../hooks/useHomeContext";
import { MexicoIcon } from "../icons/Mexico";
import { getThemeClass } from "../../../utils";
import { UsaIcon } from "../icons/Usa";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../constants";

const Language: FC = () => {
  const { themeMode } = useHomeContext();
  const { i18n } = useTranslation();

  useLayoutEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const onEsp = (): void => {
    i18n.changeLanguage(LANGUAGES.ES);
    localStorage.setItem("language", LANGUAGES.ES);
  };

  const onEng = (): void => {
    localStorage.setItem("language", LANGUAGES.EN);
    i18n.changeLanguage(LANGUAGES.EN);
  };

  return (
    <div id={css.language}>
      <div id={css.toggle} className={getThemeClass(themeMode, css)}>
        <div
          className={css.flag}
          data-active={i18n.language === LANGUAGES.ES ? 0 : 1}
          data-mode={themeMode}
          onClick={onEng}
        >
          <UsaIcon />
        </div>
        <div
          className={css.flag}
          data-mode={themeMode}
          data-active={i18n.language === LANGUAGES.ES ? 1 : 0}
          onClick={onEsp}
        >
          <MexicoIcon />
        </div>
      </div>
    </div>
  );
};

export default Language;
