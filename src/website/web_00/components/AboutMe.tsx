import { FC } from "react";
import css from "../styles/aboutMe.module.scss";
import useHomeContext from "../hooks/useHomeContext";

const AboutMe: FC = () => {
  const { themeMode } = useHomeContext();

  return (
    <div id={css.aboutMe} data-mode={themeMode}>
      <h1>Acerca de Mi</h1>
      <p>
        Desarrollador de software consumado y orientado a los resultados, muy
        apreciado por desarrollar aplicaciones que cumplen y superan los
        exigentes requisitos corporativos y de los clientes. Buscado por
        excelentes habilidades analíticas, con la capacidad de resolver
        problemas desafiantes utilizando una combinación de estándares de la
        industria y tecnologías de vanguardia, entregando un código limpio y
        bien estructurado; con un conjunto de habilidades para trabajar de
        manera compatible con los clientes para comprender los requisitos y
        desarrollar productos que superen las expectativas de calidad con
        entregas a tiempo.
      </p>
    </div>
  );
};

export default AboutMe;
