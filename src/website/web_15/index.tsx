import { FC } from "react";
import css from "./styles/main.module.scss";

const BentoGrid: FC = () => {
  return (
    <div id={css.main}>
      <div id={css.wrapper}>
        <div className={css.header} />
        <div className={css.element00}>
          <div className={css.wrapper01}>
            <div className={css.wrapper02}></div>
          </div>
        </div>
        <div className={css.element01}>
          <div className={css.wrapper}></div>
        </div>
        <div className={css.element02}>
          <div className={css.wrapper01}>
            <div className={css.wrapper02}></div>
          </div>
        </div>
        <div className={css.element10}>
          <div className={css.wrapper01}>
            <div className={css.wrapper02}></div>
          </div>
        </div>
        <div className={css.element11}>
          <div className={css.overflowWrapper01}>
            <div className={css.overflowWrapper02}></div>
          </div>
          <div className={css.wrapper01}>
            <div className={css.wrapper02}></div>
          </div>
        </div>
        <div className={css.element12}>
          <div className={css.wrapper01}></div>
        </div>
        <div className={css.element13}>
          <div className={css.wrapper01}></div>
        </div>
        <div className={css.element20}>
          <div className={css.wrapper01}>
            <div className={css.wrapper02}></div>
          </div>
        </div>
        <div className={css.element30}>
          <div className={css.wrapper01}>
            <div className={css.wrapper02}></div>
          </div>
        </div>
        <div className={css.element40}>
          <div className={css.wrapper01}>
            <div className={css.wrapper02}></div>
          </div>
        </div>
        <div className={css.element41}>
          <div className={css.wrapper01}>
            <div className={css.wrapper02}></div>
          </div>
        </div>
        <div className={css.element42}>
          <div className={css.wrapper01}></div>
        </div>
        <div className={css.footer}>
          <div className={css.overflowWrapper} />
          <div className={css.wrapper}></div>
        </div>
        <div className={css.gap} />
      </div>
    </div>
  );
};

export default BentoGrid;
