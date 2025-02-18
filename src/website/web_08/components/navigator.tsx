import { FC } from "react";
import css from "../styles/navigator.module.scss";
import Link from "./navigatorLink";

const Navigator: FC = () => {
  return (
    <div id={css.navigator}>
      <Link selected={true} text={"Inicio"} />
      <Link text={"Nosotros"} selected={false} />
      <Link text={"Proyectos"} selected={false} />
      <Link text={"Precios"} selected={false} />
      <Link text={"Contacto"} selected={false} />
    </div>
  );
};

export default Navigator;
