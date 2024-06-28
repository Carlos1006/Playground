import css from "./styles/main.module.scss";
import Background from "./components/background";
import { FC } from "react";

const AnimeLandingVideo: FC = () => {
  return (
    <main id={css.main}>
      <nav id={css.header}></nav>
      <aside id={css.sidebar}></aside>
      <aside id={css.sidebarRight}></aside>
      <div id={css.miniVideo}>
        <div id={css.dot}></div>
      </div>
      <footer id={css.footer}></footer>
      <div id={css.rotativeLink}></div>
      <div id={css.cornerText}></div>
      <div id={css.hero}>
        <div className={css.wideCenter}>
          <Background key="wideCenter" />
          <div id={css.wideCenterContent}>
            <div className={css.blurContent}></div>
            <div className={css.blurContent}></div>
          </div>
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
