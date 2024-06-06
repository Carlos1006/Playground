import { FC } from "react";
import Background from "./components/background";
import css from "./styles/main.module.scss";
import { IoTrendingUpOutline } from "react-icons/io5";
import { HiArrowUpLeft } from "react-icons/hi2";

const AnimeLanding: FC = () => {
  return (
    <main id={css.main}>
      <div id={css.topLeftNav}>
        <button className={`${css.button} ${css.light}`}>AI-Verse</button>
        <button className={`${css.button} ${css.dark}`}>Home</button>
        <button className={`${css.button} ${css.dark}`}>Sign up</button>
      </div>

      <div id={css.topRightOptions}>
        <button className={css.pinkLink}>
          <HiArrowUpLeft />
        </button>
        <div className={css.rowTop}>
          <button>Free Trial</button>
          <button>Unlimited images</button>
        </div>
        <div className={css.rowBottom}>
          <span>Join us Today!</span>
        </div>
        <div className={css.cornerMask}></div>
      </div>

      <div id={css.bottomLeftTitle}>
        <span>Discover the</span>
        <span>future of AI</span>
      </div>

      <div id={css.bottomRightSocial}>
        <button className={css.outlineButton}>
          <HiArrowUpLeft />
        </button>
        <div className={css.columnLeft}>
          <span>Artist all over the world</span>
          <span>20k+</span>
          <span>Artists</span>
        </div>
        <div className={css.columnRight}>
          <div className={css.aiImage}></div>
          <div className={css.aiImages}>
            <div className={css.aiMiniImage1}></div>
            <div className={css.aiMiniImage2}></div>
            <div className={css.aiMiniImage3}></div>
          </div>
        </div>
        <div className={css.cornerMask}></div>
      </div>

      <div id={css.centerStatistics}>
        <div className={css.centerStatisticsBody}>
          <span>Creative insight</span>
          <span>30K</span>
          <span>active users</span>
          <div className={css.barGraph}>
            {/* BAR + Title 15 */}
            {/* BAR + Title 16 */}
            {/* BAR + Title 17 */}
            {/* BAR + Title 18 */}
            {/* BAR + Title 19 */}
            {/* BAR + Title 20 */}
          </div>
        </div>
        <button className={css.blackLink}>
          <IoTrendingUpOutline />
        </button>
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
