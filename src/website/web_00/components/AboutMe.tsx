import { FC } from "react";
import css from "../styles/aboutMe.module.scss";
import useHomeContext from "../hooks/useHomeContext";
import { useTranslation } from "react-i18next";

const AboutMe: FC = () => {
  const { themeMode } = useHomeContext();
  const { t } = useTranslation();

  return (
    <div id={css.aboutMe} data-mode={themeMode}>
      <h1>{t("about_me_title")}</h1>
      <p>{t("about_me_long_text")}</p>
    </div>
  );
};

export default AboutMe;
