import {
  TypescriptIcon,
  JavascriptIcon,
  CSSIcon,
  SassIcon,
  ReactIcon,
  SvelteIcon,
  ArduinoIcon,
  AngularIcon,
  DockerIcon,
  ExpoIcon,
  GitIcon,
  GithubIcon,
  HtmlIcon,
  FigmaIcon,
  JQueryIcon2,
  NestJsIcon,
  MuiIcon,
  MySqlIcon,
  PostgresIcon,
  PostmanIcon,
  ReduxIcon,
  NextJsIcon,
  ViteIcon,
  TailwindIcon,
  ThreeJsIcon,
  ObsidianIcon,
} from "../icons";
import { ISkillObject } from "../types";

export const SKILLS: ISkillObject[] = [
  {
    name: "Typescript",
    description:
      "Amplio dominio en la implementación avanzada, incluyendo tipado estricto, interfaces complejas y tipado genérico, optimizando la calidad del código y la escalabilidad en proyectos de gran envergadura. Experiencia sólida en la integración con entornos de desarrollo como Vite, React y sistemas de compilación modernos.",
    icon: TypescriptIcon,
    level: 11,
    color: "#007ACC",
  },
  {
    name: "Javascript",
    description:
      "Dominio avanzado, incluyendo ES6+ y las últimas especificaciones del lenguaje. Experiencia en la creación de aplicaciones web escalables, optimización de rendimiento, y uso de técnicas avanzadas como closures, promesas y programación asíncrona. Familiaridad con múltiples paradigmas de programación (funcional, orientada a objetos) y habilidades para resolver problemas complejos en entornos dinámicos.",
    icon: JavascriptIcon,
    level: 11,
    color: "#F0DB4F",
  },
  {
    name: "HTML",
    description:
      "Dominio completo para la creación de interfaces web avanzadas y accesibles. Experiencia en implementar estructuras semánticas y optimizadas para SEO, junto con un enfoque en accesibilidad mediante el uso de ARIA y otras buenas prácticas. Habilidades sólidas en diseño de interfaces complejas que mejoran la experiencia de usuario en aplicaciones web modernas.",
    icon: HtmlIcon,
    level: 11,
    color: "#E14E1D",
  },
  {
    name: "CSS",
    description:
      "Dominio completo, incluyendo Flexbox, Grid y técnicas avanzadas de diseño responsivo y adaptativo. Experiencia en la creación de interfaces complejas y visualmente atractivas, así como en la optimización de rendimiento mediante buenas prácticas. Habilidad para implementar animaciones y transiciones fluidas que enriquecen la experiencia de usuario en aplicaciones web modernas.",
    icon: CSSIcon,
    level: 11,
    color: "#0277BD",
  },
  {
    name: "Sass",
    description:
      "Dominio completo como preprocesador de CSS, aprovechando variables, mixins, y funciones avanzadas para mejorar la eficiencia y escalabilidad del código. Experiencia en la organización de proyectos grandes y en la creación de estilos modulares y reutilizables, optimizando el mantenimiento y la consistencia visual en aplicaciones complejas.",
    icon: SassIcon,
    level: 11,
    color: "#CD6799",
  },
  {
    name: "React",
    description:
      "Dominio completo para la creación de aplicaciones web dinámicas y escalables. Experiencia en el uso de hooks y context API, así como en la implementación de patrones avanzados que optimizan la estructura y la mantenibilidad del código. Habilidad para gestionar el estado de manera eficiente y mejorar el rendimiento de las aplicaciones mediante técnicas como la memoización y el lazy loading.",
    icon: ReactIcon,
    level: 11,
    color: "#00D8FF",
  },
  {
    name: "NextJs",
    description:
      "Buen dominio para el desarrollo de aplicaciones web basadas en React, con experiencia en la creación de rutas dinámicas y estáticas. Familiaridad con características como la generación de sitios estáticos (SSG) y la renderización del lado del servidor (SSR). Capacidad para implementar optimizaciones de rendimiento y gestionar datos de manera efectiva utilizando API integradas.",
    icon: NextJsIcon,
    level: 7,
    color: "#FFFFFF",
  },
  {
    name: "Mui",
    description:
      "Dominio completo para la creación de interfaces de usuario consistentes y accesibles en aplicaciones React. Experiencia en la personalización avanzada de componentes y en la implementación de temas, asegurando una apariencia visual atractiva y coherente. Habilidad para integrar MUI de manera efectiva con otras tecnologías y optimizar el rendimiento de la interfaz a través de un uso eficiente de sus capacidades.",
    icon: MuiIcon,
    level: 10,
    color: "#164A83",
  },
  {
    name: "Redux",
    description:
      "Buen dominio para la gestión del estado en aplicaciones React. Experiencia en la implementación de patrones de flujo de datos unidireccional y en la creación de acciones y reducers para manejar la lógica del estado. Habilidad para integrar Redux con middleware como Redux Thunk o Saga, optimizando la gestión de efectos secundarios y mejorando la escalabilidad de aplicaciones complejas.",
    icon: ReduxIcon,
    level: 8,
    color: "#764ABC",
  },
  {
    name: "Tailwind",
    description:
      "Buen dominio para la creación de interfaces de usuario mediante un enfoque de diseño utilitario. Experiencia en la personalización de estilos utilizando clases utilitarias y en la implementación de diseños responsivos de manera eficiente. Capacidad para integrar Tailwind con proyectos React y optimizar el flujo de trabajo de desarrollo mediante la configuración de herramientas como PostCSS.",
    icon: TailwindIcon,
    level: 7,
    color: "#27B8BD",
  },
  {
    name: "Svelte",
    description:
      "Dominio avanzado para la creación de aplicaciones web reactivas y altamente optimizadas. Experiencia en la utilización de su enfoque de compilación para generar código eficiente y en la implementación de componentes reutilizables. Habilidad para gestionar el estado de manera efectiva y crear interacciones fluidas, aprovechando la simplicidad y la rapidez de desarrollo que ofrece Svelte.",
    icon: SvelteIcon,
    level: 9,
    color: "#FF3E00",
  },
  {
    name: "Angular",
    description:
      " Buen dominio para el desarrollo de aplicaciones web robustas y escalables. Experiencia en la creación de componentes reutilizables y en la gestión del estado mediante servicios e inyección de dependencias. Habilidad para implementar rutas, formularios y optimizaciones de rendimiento utilizando herramientas y características del framework, como el lazy loading y la detección de cambios.",
    icon: AngularIcon,
    level: 8,
    color: "#E23237",
  },
  {
    name: "ThreeJs",
    description:
      "Dominio avanzado para la creación de gráficos 3D interactivos en aplicaciones web. Experiencia en la implementación de escenas complejas, iluminación, texturización y animaciones, aprovechando las capacidades del framework para optimizar el rendimiento. Habilidad para integrar modelos 3D y efectos visuales, creando experiencias inmersivas y dinámicas en la web.",
    icon: ThreeJsIcon,
    level: 9,
    color: "#F0F0F0",
  },
  {
    name: "React Native / Expo",
    description:
      "ominio avanzado de React Native y Expo para el desarrollo de aplicaciones móviles multiplataforma. Experiencia en la creación de interfaces de usuario nativas y altamente interactivas, así como en la integración de APIs y módulos nativos. Habilidad para optimizar el rendimiento de las aplicaciones y aprovechar las herramientas de Expo para una implementación y prueba más eficiente.",
    icon: ExpoIcon,
    level: 9,
    color: "#4630EB",
  },
  {
    name: "Postman",
    description:
      "Dominio completo para el diseño, prueba y documentación de APIs. Experiencia en la creación de colecciones de solicitudes, automatización de pruebas y uso de entornos para gestionar diferentes configuraciones de API. Habilidad para integrar Postman con herramientas de CI/CD y para generar documentación técnica detallada, mejorando la comunicación y colaboración entre equipos de desarrollo.",
    icon: PostmanIcon,
    level: 10,
    color: "#FF6C37",
  },
  {
    name: "MySql",
    description:
      "Dominio completo para la gestión y manipulación de bases de datos relacionales. Experiencia en el diseño de esquemas de bases de datos, optimización de consultas y uso de índices para mejorar el rendimiento. Habilidad para implementar procedimientos almacenados, triggers y transacciones, asegurando la integridad y eficiencia de los datos en aplicaciones escalables.", //  Familiaridad con herramientas de administración y análisis de rendimiento para mantener bases de datos saludables y eficientes.
    icon: MySqlIcon,
    level: 10,
    color: "#08668E",
  },
  {
    name: "Vite",
    description:
      "Dominio avanzado como herramienta de construcción y desarrollo para aplicaciones web modernas. Experiencia en la configuración y optimización de proyectos, aprovechando su enfoque de carga rápida y su integración con frameworks como React. Habilidad para utilizar características como el hot module replacement (HMR) y la generación de builds optimizados, mejorando la experiencia de desarrollo y el rendimiento de las aplicaciones.",
    icon: ViteIcon,
    level: 9,
    color: "#6E99FF",
  },
  {
    name: "Postgres",
    description:
      "Dominio avanzado como sistema de gestión de bases de datos relacionales. Experiencia en la implementación de esquemas de bases de datos complejos, optimización de consultas y uso de funciones avanzadas como triggers, procedimientos almacenados y extensiones. Habilidad para gestionar transacciones y asegurar la integridad de los datos, así como para realizar análisis de rendimiento y ajuste de configuración para mejorar la eficiencia en aplicaciones escalables.",
    icon: PostgresIcon,
    level: 9,
    color: "#336791",
  },
  {
    name: "NestJs",
    description:
      "Buen dominio para el desarrollo de aplicaciones backend escalables y eficientes. Experiencia en la creación de módulos, controladores y servicios, aprovechando la arquitectura basada en módulos de Nest para estructurar proyectos de manera efectiva. Familiaridad con la integración de bases de datos y la implementación de API RESTful, así como en la gestión de dependencias y middleware para optimizar el rendimiento y la mantenibilidad del código.",
    icon: NestJsIcon,
    level: 7,
    color: "#E0234E",
  },
  {
    name: "Docker",
    description:
      "Buen dominio para la creación y gestión de contenedores, facilitando el desarrollo y despliegue de aplicaciones en entornos aislados. Experiencia en la elaboración de Dockerfiles, configuración de imágenes y la gestión de volúmenes para persistencia de datos. Familiaridad con Docker Compose para orquestar aplicaciones multi-contenedor y habilidades para integrar Docker en flujos de trabajo de CI/CD, optimizando la eficiencia en el desarrollo y la implementación.",
    icon: DockerIcon,
    level: 7,
    color: "#2496ED",
  },
  {
    name: "Git",
    description:
      "Buen dominio para el control de versiones en proyecto. Experiencia en la gestión de ramas, fusión y resolución de conflictos, así como en la implementación de flujos de trabajo eficientes utilizando estrategias como Git Flow. Habilidad para utilizar herramientas de colaboración, como GitHub y GitLab, y para realizar revisiones de código y gestionar pull requests, asegurando una colaboración efectiva en equipos de desarrollo.",
    icon: GitIcon,
    level: 8,
    color: "#F34F29",
  },
  {
    name: "Github",
    description:
      "Dominio completo como plataforma de colaboración y control de versiones. Experiencia en la gestión de repositorios, implementación de flujos de trabajo de desarrollo colaborativo. Habilidad para llevar a cabo revisiones de código efectivas, gestionar pull requests y mantener documentación clara y accesible, promoviendo la eficiencia y la colaboración en equipos de desarrollo.",
    icon: GithubIcon,
    level: 10,
    color: "#F0F6FC",
  },
  {
    name: "JQuery",
    description:
      "Dominio completo para la manipulación eficiente del DOM y la gestión de eventos en aplicaciones web. Experiencia en la creación de efectos y animaciones, así como en la simplificación de las interacciones AJAX y la gestión de compatibilidad entre navegadores. Habilidad para implementar plugins y extender funcionalidades, mejorando la experiencia del usuario y la interacción en aplicaciones web dinámicas.",
    icon: JQueryIcon2,
    level: 10,
    color: "#0769AD",
  },
  {
    name: "Figma",
    description:
      "Buen dominio para la colaboración efectiva en el diseño y desarrollo de interfaces. Experiencia en la interpretación de especificaciones de diseño, extracción de activos y estilos, y en la comunicación con diseñadores para asegurar la fidelidad entre el diseño y la implementación.", // Habilidad para utilizar herramientas y plugins de Figma que facilitan el flujo de trabajo entre diseño y desarrollo, mejorando la eficiencia en la creación de interfaces.
    icon: FigmaIcon,
    level: 7,
    color: "#F24E1E",
  },
  {
    name: "Arduino",
    description:
      "Conocimiento intermedio, adquirido principalmente a través de proyectos personales y hobbies. Experiencia en la programación de microcontroladores para crear prototipos y proyectos interactivos, utilizando sensores y actuadores. Familiaridad con la plataforma de desarrollo de Arduino y capacidad para implementar circuitos básicos, explorando conceptos de electrónica y programación de manera creativa.",
    icon: ArduinoIcon,
    level: 6,
    color: "#00979D",
  },
  {
    name: "Obsidian",
    description:
      "Buen dominio de Obsidian como herramienta de toma de notas y gestión de conocimiento. Experiencia en la organización de información mediante enlaces bidireccionales y la creación de una red de notas interconectadas. Habilidad para utilizar plugins y personalizaciones que mejoran la funcionalidad, así como para implementar técnicas de productividad personal, como el método Zettelkasten, optimizando la gestión del conocimiento y la creatividad.",
    icon: ObsidianIcon,
    level: 8,
    color: "#5D33B0",
  },
];

// <span>Frontend</span> <span>React, Redux, TypeScript, SCSS</span>
// <span>Backend</span> <span>Node.js, Express, MongoDB, MySQL</span>
// <span>DevOps</span> <span>Docker, Kubernetes, Jenkins</span>
// <span>Cloud</span> <span>AWS, GCP, Azure</span>
// <span>CI/CD</span> <span>GitHub Actions, Travis CI, Circle CI</span>
// <span>Testing</span> <span>Jest, React Testing Library, Mocha</span>
// <span>Other</span> <span>Git, Agile, Scrum, Kanban, Jira</span>
