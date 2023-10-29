import css from "../styles/header.module.scss";
import Button from "./button";
import Link from "./headerLink";

const Header = () => {
  const title = "REDUCTO";

  return (
    <div id={css.header}>
      <div id={css.logo} />
      <span id={css.name}>{title}</span>
      <Link text={"Inicio"} />
      <Link text={"Nosotros"} />
      <Link text={"Proyectos"} />
      <Link text={"Precios"} />
      <Button class_={css.button}>Contacto</Button>
      <div id={css.menu} />
    </div>
  );
};

export default Header;
