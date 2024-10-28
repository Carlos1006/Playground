import { FC } from "react";
import css from "../styles/coreCompetencies.module.scss";
import useHomeContext from "../hooks/useHomeContext";

const CoreCompetenciesOld: FC = () => {
  const { themeMode } = useHomeContext();

  return (
    <div id={css.coreCompetencies} data-mode={themeMode}>
      <h1>Core Competencies</h1>
      <div id={css.coreCompetenciesWrapper}>
        <span>C://Windows/MyData/Carlos/CoreCompetencies&gt; cd</span>
        <span># showing core competencies: </span>
        <span>
          <i>-it</i> Integración de tecnología
        </span>
        <span>
          <i>-le</i> Liderazgo de equipo
        </span>
        <span>
          <i>-sp</i> Scripting y Programación
        </span>
        <span>
          <i>-rp</i> Resolución de problemas
        </span>
        <span>
          <i>-d</i> Documentación
        </span>
        <span>
          <i>-pc</i> Pensamiento crítico
        </span>
        <span>
          <i>-te</i> Trabajo en equipo
        </span>
        <span>
          <i>-p</i> Priorización
        </span>
        <span>
          <i>-me</i> Mantenimiento de equipo
        </span>
        <span>
          <i>-at</i> Adaptabilidad Tecnológica
        </span>
        <span>
          <i>-pe</i> Productividad y eficiencia con IA
        </span>
        <span>
          <i>-td</i> Toma de decisiones informada
        </span>
      </div>
    </div>
  );
};

export default CoreCompetenciesOld;
