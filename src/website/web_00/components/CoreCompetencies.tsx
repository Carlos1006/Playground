import { FC } from "react";
import css from "../styles/coreCompetencies.module.scss";

const CoreCompetencies: FC = () => {
  return (
    <div id={css.coreCompetencies}>
      <h1>Core Competencies</h1>
      <div id={css.coreCompetenciesWrapper}>
        <span>Desarrollo de software</span>
        <span>Servicios web</span>
        <span>Integración de tecnología</span>
        <span>Liderazgo de equipo</span>
        <span>Desarrollo web</span>
        <span>Scripting y Programación</span>
        <span>Recopilación de requisitos</span>
        <span>Resolución de problemas</span>
        <span>Documentación</span>
        <span>Pensamiento crítico</span>
        <span>Trabajo en equipo</span>
        <span>Priorización</span>
        <span>Mantenimiento de equipo</span>
      </div>
    </div>
  );
};

export default CoreCompetencies;
