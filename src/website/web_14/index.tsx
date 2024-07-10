import css from "./styles/main.module.scss";
import Background from "./components/background";
import { FC } from "react";
import { LiaLongArrowAltRightSolid as ArrowIcon } from "react-icons/lia";
import { TfiArrowRight } from "react-icons/tfi";
import { TfiArrowTopRight as ArrowTopRightIcon } from "react-icons/tfi";
import { LiaLongArrowAltUpSolid as ArrowTopIcon } from "react-icons/lia";
import { LiaLongArrowAltDownSolid as ArrowBottomIcon } from "react-icons/lia";

import { RiInstagramLine as IgIcon } from "react-icons/ri";
import { RiTwitterXLine as XIcon } from "react-icons/ri";
import { ImYoutube as YoutubeIcon } from "react-icons/im";
import animeGirlImg from "./assets/animeGirl.png";
import animeGirlImg2 from "./assets/animeGirl2.png";
import animeGirlImg3 from "./assets/animeGirl3.png";
import animeGirlImg4 from "./assets/animeGirl4.png";
import { PiPlayThin as PlayIcon } from "react-icons/pi";

const ANIME_GIRLS: string[] = [animeGirlImg2, animeGirlImg3, animeGirlImg4];

const AnimeLandingVideo: FC = () => {
  return (
    <main id={css.main}>
      <div className={css.glow0} />
      <div className={css.glow1} />
      <div className={css.glow2} />
      <div className={css.glow3} />
      <div id={css.wrapper}>
        <nav id={css.header}>
          <span>Home</span>
          <span>Story</span>
          <span>Characters</span>
          <span>Media</span>
        </nav>
        <aside id={css.sidebar}>
          <span className={css.socialMediaText}>Social Media</span>
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
        <aside id={css.sidebarRight}>
          <div className={css.sidebarRightWrapper}>
            <div className={css.arrow}>
              <ArrowTopIcon />
            </div>
            <div className={css.arrow}>
              <ArrowBottomIcon />
            </div>
          </div>
        </aside>
        <div id={css.miniVideo}>
          <div className={css.shadow}>
            <div className={css.playButton}>
              <PlayIcon />
            </div>
          </div>
          <img src={animeGirlImg} alt=""></img>
          {/* <div id={css.dot}></div> */}
        </div>
        <footer id={css.footer}>
          <div id={css.footerWrapper}>
            <button className={css.footerBottom}>Join us</button>
            <button className={css.footerBottom}>Community</button>
            <button className={css.footerBottom}>News & Updates</button>
            <span>
              b Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              at metus euismod, hendrerit nunc nec, bibendum est. Nullam nec
              vestibulum risus. Nulla facilisi.
            </span>
          </div>
        </footer>
        <div id={css.rotativeLink}>
          <span>Join now!</span>
        </div>
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
              <div className={css.blurContent}>
                <div className={css.blurContentWrapper}>
                  <div>
                    <div>
                      <span>About</span>
                    </div>
                    <div>
                      <span>Game:</span>
                    </div>
                  </div>
                  <div>
                    <ArrowTopRightIcon />
                  </div>
                  <div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vivamus at metus euismod, hendrerit nunc nec, bibendum
                      est. Nullam nec vestibulum risus. Nulla facilisi. Lorem
                      ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                      at
                    </p>
                  </div>
                </div>
              </div>
              <div className={css.blurContent}>
                <div className={css.blurContentWrapper}>
                  <div>
                    <span>Characters:</span>
                  </div>
                  <div>
                    <ArrowTopRightIcon />
                  </div>
                  <div>
                    {ANIME_GIRLS.map((img) => (
                      <div className={css.character} key={img}>
                        <img src={img} alt="" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
      </div>
    </main>
  );
};

export default AnimeLandingVideo;
