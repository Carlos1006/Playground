import { FC } from "react";
import css from "./styles/main.module.scss";

const AnimeLanding: FC = () => {
  return (
    <main id={css.main}>
      <div className={css.containerCenterWide}></div>
      <div className={css.containerTopHalf}></div>
      <div className={css.containerRightHalf}></div>
      <div className={css.containerBottomHalf}></div>

      <div className={css.topLeftMask}></div>
      <div className={css.topRightMask}></div>
      <div className={css.bottomLeftMask}></div>
      <div className={css.bottomRightMask}></div>
    </main>
  );
};

export default AnimeLanding;
