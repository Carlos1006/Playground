import { FC, useRef, useState } from "react";
import css from "./styles/main.module.scss";

import { BsDot, BsArrowRight, BsArrowUpRight } from "react-icons/bs";
import Forest from "./components/forest";
import { TiSocialFacebook, TiSocialLinkedin } from "react-icons/ti";
import { AiFillInstagram } from "react-icons/ai";
import logo from "./assets/images/reducto.png";

const Main: FC = () => {
  const mainContainer = useRef<HTMLDivElement>(null);
  const [onHover, setOnHover] = useState(false);

  const onMouseEnter = () => {
    setOnHover(true);
  };
  const onMouseLeave = () => {
    setOnHover(false);
  };

  return (
    <div ref={mainContainer} id={css.container}>
      <div className={`${css.page} ${onHover ? css.blur : ""}`}>
        <div className={css.header}>
          <div className={css.logo}>
            <img src={logo} alt="logo" />
          </div>
          <div className={css.menu}>
            <span>Home</span>
            <span>About</span>
            <span>Contact</span>
            <span>Projects</span>
          </div>
          <div
            className={css.button}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <button>Join us</button>
            <div>
              <BsArrowUpRight />
            </div>
          </div>
        </div>
        <div className={css.body}>
          <div className={css.leftBar}>
            <div className={`${css.navigatorDot} ${css.selected}`}>
              <BsDot />
            </div>
            <div className={css.navigatorDot}>
              <BsDot />
            </div>
            <div className={css.navigatorDot}>
              <BsDot />
            </div>
          </div>
          <div className={css.central}>
            <div className={css.mainContainer}>
              <div className={css.main}>
                <div className={css.name}>
                  <span>REDUCTO</span>
                  <span>REDUCTO</span>
                </div>
                <span className={css.subtitle}>
                  Lorem ipsum dolor sit amet consectetur
                </span>
                <span className={css.cta}>
                  <label>Lets get started</label>
                  <div className={css.ctaIcon}>
                    <BsArrowRight />
                  </div>
                </span>
              </div>
            </div>
            <div className={css.footer}></div>
          </div>
          <div className={css.rightBar}>
            <div className={css.socialIcon}>
              <TiSocialFacebook />
            </div>
            <div className={`${css.socialIcon} ${css.smaller}`}>
              <AiFillInstagram />
            </div>
            <div className={css.socialIcon}>
              <TiSocialLinkedin />
            </div>
          </div>
        </div>
      </div>
      <Forest
        mainContainer={mainContainer}
        className={onHover ? css.blur : ""}
      />
    </div>
  );
};

export default Main;
