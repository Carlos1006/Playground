import { FC } from "react";
import css from "../styles/main.module.scss";

const Arrow: FC = () => {
  return (
    <div className={css.arrow}>
      <div className={css.arrow01}></div>
      <div className={css.octopus}>
        <span>🐙</span>
      </div>
      <div className={css.arrow02}></div>
    </div>
  );
};

export default Arrow;
