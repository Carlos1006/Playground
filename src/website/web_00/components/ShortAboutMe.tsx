import { FC } from "react";
import css from "../styles/shortAboutMe.module.scss";
import useHomeContext from "../hooks/useHomeContext";
import { useTranslation } from "react-i18next";

const ShortAboutMe: FC = () => {
  const { t } = useTranslation();
  const { themeMode } = useHomeContext();

  return (
    <div id={css.shortAboutMe} data-mode={themeMode}>
      <h1>{t("about_me_title")}</h1>
      <p>{t("about_me_short_text")}</p>
    </div>
  );
};

export default ShortAboutMe;
