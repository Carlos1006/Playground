import { FC } from "react";
import css from "../styles/skills.module.scss";

const JobBanregio: FC = () => {
  return (
    <p id={css.banregioJob}>
      <span>Desarrollador Front-end</span>
      <ul>
        <li>
          <b>Gestión de Base de Datos:</b> Administración y optimización en SQL
          Server para asegurar la integridad y eficiencia de los datos en el
          entorno bancario.
        </li>
        <li>
          <b>Desarrollo de Microservicios:</b> Diseño, desarrollo, pruebas e
          implementación de microservicios web utilizando Java Spring Boot,
          facilitando escalabilidad y robustez en los servicios.
        </li>
        <li>
          <b>Desarrollo de Plataforma Interna:</b> Creación de un sitio web
          interno en Angular para mejorar la gestión y la comunicación
          organizacional, optimizando flujos de trabajo internos.
        </li>
        <li>
          <b>Soporte y Atención al Cliente Interno:</b> Respuesta rápida y
          precisa a consultas de clientes internos, líderes y product owners,
          asegurando soluciones eficientes y soporte técnico continuo.
        </li>
        <li>
          <b>Colaboración y Análisis de Requisitos:</b> Colaboración con
          gerencia y equipos departamentales para definir requisitos y
          especificaciones de usuarios finales, garantizando el desarrollo
          alineado con las necesidades del negocio.
        </li>
        <li>
          <b>Optimización y Mantenimiento de Software:</b> Diseño de algoritmos,
          desarrollo de código limpio y eficiente, depuración de software y
          mejoras continuas en sistemas existentes.
        </li>
        <li>
          <b>Feedback de Usuarios:</b> Recopilación y análisis de comentarios de
          usuarios para ajustar el software y mejorar el rendimiento.
        </li>
        <li>
          <b>Documentación y Gestión Ágil de Proyectos:</b> Desarrollo de
          documentación técnica, gestión de proyectos en entornos Scrum y
          liderazgo de equipos, impulsando la planificación y seguimiento eficaz
          de proyectos.
        </li>
      </ul>
    </p>
  );
};

export default JobBanregio;
