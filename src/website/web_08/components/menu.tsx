import { FC } from "react";
import css from "../styles/menu.module.scss";
import Link from "./link";

const Menu: FC = () => {
  return (
    <div id={css.menu}>
      {/*fill="#e4e1fa"*/}
      <Link icon={"instagram"} name={"naker21"} />
      <Link icon={"linkedin"} name={"CarlosDGL"} />
      <Link icon={"github"} name={"Naker21"} />
      <Link icon={"facebook"} name={"nnv21"} />
      <Link id={"reducto"} icon={"reducto"} name={"SitioWeb 2022"} />
    </div>
  );
};

export default Menu;
