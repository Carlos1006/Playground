import { FC } from "react";
import css from "../styles/coreCompetencies.module.scss";
import useHomeContext from "../hooks/useHomeContext";
import { MODE } from "../constants";
import CoreCompetenciesOld from "./CoreCompetenciesOld";

const CoreCompetencies: FC = () => {
  const { themeMode } = useHomeContext();

  if (themeMode === MODE.OLD) return <CoreCompetenciesOld />;

  return (
    <div id={css.coreCompetencies} data-mode={themeMode}>
      {/* <h1>Core Competencies</h1> */}
      <h1>Competencias Destacables</h1>
      <div id={css.coreCompetenciesWrapper}>
        <span>Desarrollo de software</span>
        <span>Servicios web</span>
        <span>Recopilación de requisitos</span>
        <span>Desarrollo web</span>
        <span>Integración de tecnología</span>
        <span>Liderazgo de equipo</span>
        <span>Scripting y Programación</span>
        <span>Resolución de problemas</span>
        <span>Documentación</span>
        <span>Pensamiento crítico</span>
        <span>Trabajo en equipo</span>
        <span>Priorización</span>
        <span>Mantenimiento de equipo</span>
        <span>Adaptabilidad Tecnológica</span>
        <span>Productividad y eficiencia con IA</span>
        <span>Toma de decisiones informada</span>
      </div>
    </div>
  );
};

export default CoreCompetencies;
