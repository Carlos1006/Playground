import { FC } from "react";
import css from "../styles/shortAboutMe.module.scss";

const ShortAboutMe: FC = () => {
  return (
    <div id={css.shortAboutMe}>
      <h1>About Me</h1>
      <p>
        Agente de cambio impulsado por la visión con un largo historial de
        desarrollo de software, modificación de software, diseño multimedia y
        éxito en la gestión para organizaciones líderes
      </p>
    </div>
  );
};

export default ShortAboutMe;
