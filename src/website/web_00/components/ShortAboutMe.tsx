import { FC } from "react";
import css from "../styles/shortAboutMe.module.scss";
import useHomeContext from "../hooks/useHomeContext";

const ShortAboutMe: FC = () => {
  const { themeMode } = useHomeContext();

  return (
    <div id={css.shortAboutMe} data-mode={themeMode}>
      <h1>Acerca de Mi</h1>
      <p>
        Agente de cambio impulsado por la visión con un largo historial de
        desarrollo de software, modificación de software, diseño multimedia y
        éxito en la gestión para organizaciones líderes
      </p>
    </div>
  );
};

export default ShortAboutMe;
