import { FC } from "react";
import css from "../styles/skills.module.scss";

const JobMasttro: FC = () => {
  return (
    <p id={css.masttroJob}>
      <span>Desarrollador Web Frontend</span>
      <ul>
        <li>
          <b>Migración de Plataforma Legacy:</b> Implementación de una
          aplicación web interna utilizando React, TypeScript y MUI, como parte
          de la migración de una plataforma legacy, optimizando la funcionalidad
          y la experiencia de usuario.
        </li>
        <li>
          <b>Modernización y Mejora de UI/UX:</b> Desarrollo de componentes y
          mejoras en la interfaz utilizando MUI para alinearse con los
          estándares actuales y mejorar la usabilidad y la consistencia visual.
        </li>
        <li>
          <b>Colaboración en Equipo:</b> Trabajo conjunto con equipos de
          desarrollo y producto para definir requisitos técnicos y llevar a cabo
          una migración sin interrupciones en la operatividad del sistema.
        </li>
      </ul>
    </p>
  );
};

export default JobMasttro;
