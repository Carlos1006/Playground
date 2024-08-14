import { FC } from "react";
import css from "./styles/main.module.scss";

const BentoGrid: FC = () => {
  return (
    <div id={css.main}>
      <div id={css.wrapper}>
        <div className={css.header} />
        <div className={css.element00}></div>
        <div className={css.element01}></div>
        <div className={css.element02}></div>
        <div className={css.element10}></div>
        <div className={css.element11}></div>
        <div className={css.element12}></div>
        <div className={css.element13}></div>
        <div className={css.element20}></div>
        <div className={css.element30}></div>
        <div className={css.element40}></div>
        <div className={css.element41}></div>
        <div className={css.element42}></div>
        <div className={css.footer} />
        <div className={css.gap} />
      </div>
    </div>
  );
};

export default BentoGrid;
