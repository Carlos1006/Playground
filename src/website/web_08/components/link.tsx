import { FC } from "react";
import css from "../styles/menu.module.scss";

interface LinkProps {
  id?: string;
  icon: string;
  name: string;
}

const Link: FC<LinkProps> = ({ id = "", icon, name }: LinkProps) => {
  return (
    <div id={css[id]} className={css.link}>
      <div className={`${css.icon} ${css[icon]}`} />
      <div className={css.name}>
        <span>{name}</span>
      </div>
    </div>
  );
};

export default Link;
