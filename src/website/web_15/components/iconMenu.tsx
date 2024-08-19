import { FC } from "react";
import css from "../styles/main.module.scss";

const IconMenu: FC = () => {
  return (
    <div className={css.iconMenu}>
      <div className={css.iconOption}></div>
      <div className={css.iconOption}></div>
      <div className={css.iconOption}></div>
      <div className={css.iconOption}></div>
    </div>
  );
};

export default IconMenu;
