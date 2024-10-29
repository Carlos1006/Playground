import { FC } from "react";
import css from "../styles/header.module.scss";

const HeaderOld: FC = () => {
  return (
    <div id={css.headerOld}>
      <div id={css.divider} />
      <div className={css.item}>
        <span>Color Theme</span>
      </div>
      <div className={css.item}>
        <span>Social</span>
      </div>
    </div>
  );
};

export default HeaderOld;
