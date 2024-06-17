import css from "./styles/main.module.scss";
import Background from "./components/background";

const AnimeLandingVideo = () => {
  return (
    <main id={css.main}>
      {/* HERO CONTAINER */}
      <div id={css.hero}>
        <div className={css.wideCenter}>
          <Background key="wideCenter" />
        </div>
        <div className={css.bottomHalf}>
          <Background key="bottomHalf" />
        </div>
        <div className={css.rightHalf}>
          <Background key="rightHalf" />
        </div>
        <div className={css.leftBottom}>
          <Background key="leftBottom" />
        </div>
        <div className={css.rightBottom}>
          <Background key="rightBottom" />
        </div>
        <div className={css.rightTop}>
          <Background key="rightTop" />
        </div>
      </div>
    </main>
  );
};

export default AnimeLandingVideo;
