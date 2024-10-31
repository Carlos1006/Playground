import { FC } from "react";
import css from "../styles/skills.module.scss";

const JobAldea: FC = () => {
  return (
    <p id={css.aldeaJob}>
      <span>Desarrollador Front-end</span>
      <ul>
        <li>
          <b>Desarrollo web</b>: Creación y mantenimiento de sitios web y
          móviles, con un enfoque en ofrecer interfaces atractivas y funcionales
          para el usuario final.
        </li>
        <li>
          <b>Optimización SEO:</b>: Implementación de estrategias de
          optimización para motores de búsqueda, aumentando la visibilidad y el
          tráfico de los sitios de clientes.
        </li>
        <li>
          <b>Análisis de Resultados</b>: Configuración y uso de herramientas de
          análisis para monitorear el rendimiento de los sitios, proporcionando
          datos accionables para ajustar estrategias de marketing y mejorar la
          conversión.
        </li>
      </ul>
    </p>
  );
};

export default JobAldea;
