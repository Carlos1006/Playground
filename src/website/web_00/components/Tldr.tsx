import { FC } from "react";
import css from "../styles/tldr.module.scss";
import { ITldr } from "../types";
import useHomeContext from "../hooks/useHomeContext";
import { useTranslation } from "react-i18next";

const Tldr: FC<ITldr> = ({ active, onClick }: ITldr) => {
  const { themeMode } = useHomeContext();
  const { t } = useTranslation();

  return (
    <button
      id={css.tldr}
      className={active ? css.active : ""}
      onClick={onClick}
      data-mode={themeMode}
    >
      {t("tldr")}
    </button>
  );
};

export default Tldr;
