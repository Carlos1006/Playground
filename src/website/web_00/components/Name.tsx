import { FC } from "react";
import css from "../styles/name.module.scss";
import useHomeContext from "../hooks/useHomeContext";
import { useTranslation } from "react-i18next";
import { MY_NAME } from "../constants";

const Name: FC = () => {
  const { themeMode } = useHomeContext();
  const { t } = useTranslation();

  return (
    <div id={css.name} data-mode={themeMode}>
      <span>{t("hello_i_am")}</span>
      <span>{MY_NAME}</span>
      <div id={css.line} />
      <span>{t("role")}</span>
    </div>
  );
};

export default Name;
