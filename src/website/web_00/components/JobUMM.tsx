import { FC } from "react";
import css from "../styles/skills.module.scss";

const JobUMM: FC = () => {
  return (
    <p id={css.ummJob}>
      <span>Desarrollador Web Full Stack</span>
      <ul>
        <li>
          <b>Gestión de Base de Datos:</b> Administración, optimización y
          desarrollo en SQL Server, garantizando la integridad y el rendimiento
          de los datos institucionales.
        </li>
        <li>
          <b>Desarrollo de Aplicaciones Web:</b> Diseño, desarrollo, pruebas e
          implementación de una aplicación web en React y React Native para uso
          estudiantil, docente y administrativo, mejorando la experiencia de
          usuario en todos los niveles.
        </li>
        <li>
          <b>Colaboración Interdepartamental:</b> Trabajo conjunto con la
          gerencia y diferentes departamentos para definir requisitos y
          especificaciones de usuario final.
        </li>
        <li>
          <b>Diseño y Optimización de Software:</b> Creación de algoritmos y
          diagramas de flujo para nuevos sistemas, producción de código limpio y
          eficiente basado en necesidades específicas.
        </li>
        <li>
          <b>Mantenimiento y Mejora Continua:</b> Depuración y actualización del
          software existente, implementando mejoras para optimizar el
          rendimiento y la usabilidad.
        </li>
        <li>
          <b>Documentación Técnica:</b> Desarrollo de documentación técnica
          detallada para guiar futuros proyectos de desarrollo y facilitar el
          mantenimiento.
        </li>
      </ul>
    </p>
  );
};

export default JobUMM;
