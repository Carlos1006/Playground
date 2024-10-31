import { FC } from "react";
import css from "../styles/name.module.scss";
import useHomeContext from "../hooks/useHomeContext";

const Name: FC = () => {
  const { themeMode } = useHomeContext();

  return (
    <div id={css.name} data-mode={themeMode}>
      {/* <span>Hi!, I am</span> */}
      <span>Hola!, Yo soy</span>
      <span>Carlos Daniel Gonzalez</span>
      <div id={css.line} />
      {/* <span>Senior Software Developer</span> */}
      <span>Desarrollador de Software Senior</span>
    </div>
  );
};

export default Name;
