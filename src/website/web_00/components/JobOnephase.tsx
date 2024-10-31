import { FC } from "react";
import css from "../styles/skills.module.scss";

const JobOnephase: FC = () => {
  return (
    <p id={css.onephaseJob}>
      <span>Desarrollador Web Frontend</span>
      <ul>
        <li>
          <b>Migración de Plataformas Legacy:</b> Implementación de migraciones
          de aplicaciones legacy a tecnologías modernas utilizando React y
          TypeScript, mejorando la funcionalidad y experiencia del usuario.
        </li>
        <li>
          <b>Documentación de Componentes:</b> Participación en un proyecto
          interno para documentar componentes propietarios de la consultoría,
          facilitando la reutilización y estandarización en futuros proyectos.
        </li>
        <li>
          <b>Optimización de UI:</b> Desarrollo y mejora de la interfaz para
          adaptarla a los estándares modernos, optimizando el diseño y la
          consistencia visual en múltiples aplicaciones.
        </li>
      </ul>
    </p>
  );
};

export default JobOnephase;
