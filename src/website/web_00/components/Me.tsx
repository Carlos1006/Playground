import { FC } from "react";
import css from "../styles/me.module.scss";
import useHomeContext from "../hooks/useHomeContext";
import { useTranslation } from "react-i18next";

const Me: FC = () => {
  const { themeMode } = useHomeContext();
  const { t } = useTranslation();

  return (
    <div id={css.me} data-mode={themeMode}>
      <h1>{t("me")}</h1>
    </div>
  );
};

export default Me;
