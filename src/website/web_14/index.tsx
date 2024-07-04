import css from "./styles/main.module.scss";
import Background from "./components/background";
import { FC } from "react";
import { LiaLongArrowAltRightSolid as ArrowIcon } from "react-icons/lia";
import { TfiArrowRight } from "react-icons/tfi";
import { TfiArrowTopRight } from "react-icons/tfi";
import { LiaLongArrowAltUpSolid } from "react-icons/lia";
import { LiaLongArrowAltDownSolid } from "react-icons/lia";
import { RiInstagramLine as IgIcon } from "react-icons/ri";
import { RiTwitterXLine as XIcon } from "react-icons/ri";
import { ImYoutube as YoutubeIcon } from "react-icons/im";
import animeGirlImg from "./assets/animeGirl.png";
import { PiPlayThin as PlayIcon } from "react-icons/pi";

const AnimeLandingVideo: FC = () => {
  return (
    <main id={css.main}>
      <nav id={css.header}>
        <span>Home</span>
        <span>Story</span>
        <span>Characters</span>
        <span>Media</span>
      </nav>
      <aside id={css.sidebar}>
        <div className={css.sidebarSocial}>
          <IgIcon />
        </div>
        <div className={css.sidebarSocial}>
          <YoutubeIcon />
        </div>
        <div className={css.sidebarSocial}>
          <XIcon />
        </div>
      </aside>
      <aside id={css.sidebarRight}></aside>
      <div id={css.miniVideo}>
        <div className={css.shadow}>
          <div className={css.playButton}>
            <PlayIcon />
          </div>
        </div>
        <img src={animeGirlImg} alt=""></img>
        {/* <div id={css.dot}></div> */}
      </div>
      <footer id={css.footer}></footer>
      <div id={css.rotativeLink}></div>
      <div id={css.cornerText}>
        <div className={css.cornerTextContainer}>
          <span>Ready to join the</span>
          <span>adventure?</span>
          <span>Sign up</span>
          <div className={css.lbArrow}>
            <ArrowIcon />
          </div>
        </div>
      </div>
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
