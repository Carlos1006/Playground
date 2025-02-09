import { FC, useLayoutEffect, useState } from "react";
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
  const [active, setActive] = useState<boolean>(true);

  useLayoutEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setActive(savedLanguage === LANGUAGES.ES);
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const onEsp = (): void => {
    i18n.changeLanguage(LANGUAGES.ES);
    localStorage.setItem("language", LANGUAGES.ES);
    setActive(true);
  };

  const onEng = (): void => {
    setActive(false);
    localStorage.setItem("language", LANGUAGES.EN);
    i18n.changeLanguage(LANGUAGES.EN);
  };

  return (
    <div id={css.language}>
      <div id={css.toggle} className={getThemeClass(themeMode, css)}>
        <div
          className={css.flag}
          data-active={active ? 0 : 1}
          data-mode={themeMode}
          onClick={onEng}
        >
          <UsaIcon />
        </div>
        <div
          className={css.flag}
          data-mode={themeMode}
          data-active={active ? 1 : 0}
          onClick={onEsp}
        >
          <MexicoIcon />
        </div>
      </div>
    </div>
  );
};

export default Language;
