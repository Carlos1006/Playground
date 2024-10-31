import { FC } from "react";
import css from "../styles/skills.module.scss";

const JobMilenio: FC = () => {
  return (
    <p id={css.milenioJob}>
      <span>Frontend Developer</span>
      <ul>
        <li>
          <b>Optimización y Mantenimiento de APIs:</b>Mejora continua del API de
          las aplicaciones móviles y web para Multimedios, Telediario, y Grupo
          Milenio, asegurando alto rendimiento y estabilidad.
        </li>
        <li>
          <b>Monitoreo de Errores y Reportes Automatizados:</b>
          Desarrollo de un script de monitoreo de errores en todas las
          plataformas, generando reportes automáticos para el equipo de
          mantenimiento, lo que permitió una respuesta proactiva a incidentes y
          mejoró la experiencia del usuario.
        </li>
      </ul>
    </p>
  );
};

export default JobMilenio;
