import { FC } from "react";
import css from "../styles/schooling.module.scss";
import fcfm from "../assets/fcfm.png";
import uanl from "../assets/uanl.png";
import useHomeContext from "../hooks/useHomeContext";
import { useTranslation } from "react-i18next";

const Schooling: FC = () => {
  const { t } = useTranslation();
  const { themeMode } = useHomeContext();

  return (
    <div id={css.schooling} data-mode={themeMode}>
      <div id={css.icons}>
        <img src={uanl} alt="UANL" />
        <img src={fcfm} alt="FCFM" />
      </div>
      <h1>{t("studies")}</h1>
      <div id={css.schoolingWrapper}>
        <span>Lic. en Multimedia y Animacion Digital</span>
        <span>Facultad de Ciencias Fisico Matematicas</span>
        <span>Universidad Autonoma de Nuevo Leon</span>
        <span>2012 - 2016</span>
      </div>
    </div>
  );
};

export default Schooling;
