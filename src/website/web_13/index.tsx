import { FC } from "react";
import Background from "./components/background";
import css from "./styles/main.module.scss";

const AnimeLanding: FC = () => {
  return (
    <main id={css.main}>
      <div id={css.topLeftNav}></div>
      <div id={css.topRightOptions}></div>
      <div id={css.bottomLeftTitle}></div>
      <div id={css.bottomRightSocial}></div>
      <div id={css.centerStatistics}>
        <div className={css.borderLayer}>
          <div className={css.columnLeftBorder1}></div>
          <div className={css.cornerBorder1}></div>
          <div className={css.columnRightBorder1}></div>
          <div className={css.columnLeftBorder2}></div>
          <div className={css.columnRightBorder2}></div>
        </div>
        <div className={css.blurLayer}>
          <div className={css.columnLeft}>
            <Background blur />
          </div>
          <div className={css.columnRight}>
            <Background blur />
          </div>
          <div className={`${css.mask} ${css.topMask}`}>
            <Background />
          </div>
          <div className={`${css.mask} ${css.bottomMask}`}>
            <Background blur />
          </div>
        </div>
      </div>

      <div id={css.hero}>
        <div className={css.containerCenterWide}>
          <Background />
        </div>
        <div className={css.containerTopHalf}>
          <Background />
        </div>
        <div className={css.containerRightHalf}>
          <Background />
        </div>
        <div className={css.containerBottomHalf}>
          <Background />
        </div>
        <div className={css.topLeftMask}>
          <Background />
        </div>
        <div className={css.topRightMask}>
          <Background />
        </div>
        <div className={css.bottomLeftMask}>
          <Background />
        </div>
        <div className={css.bottomRightMask}>
          <Background />
        </div>
      </div>
    </main>
  );
};

export default AnimeLanding;
