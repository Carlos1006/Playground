import { useCallback, useEffect, useRef, useState } from "react";
import css from "./styles/main.module.scss";

// import darkMode from "../../resources/banner/darkMode.svg";
import { IMouseMove } from "./types";
import Figure from "./components/figure";
import Header from "./components/header";
import GlitchText from "./components/glitchText";

const myName = "Carlos D. Gonzalez";
const myTitle = "Desarrollador Front-End";
const myAboutMe = "Acerca de mi";
const x = 0;
const y = 1;

const Web_07 = () => {
  const aboutMeButtonRef = useRef<HTMLDivElement>(null);

  const [hiddenLogo, setHiddenLogo] = useState(true);
  const [removeWhiteScreen, setRemoveWhiteScreen] = useState(false);
  const [onHover, setOnHover] = useState(false);
  const [onDarkMode, setDarkMode] = useState(false);

  const [activeTranslation, setActiveTranslation] = useState(true);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const [viewportDimensions, serViewportDimensions] = useState([0, 0]);

  const onDarkModeToggleHandler = useCallback(() => {
    setDarkMode(!onDarkMode);
  }, [onDarkMode]);

  const aboutMeHoverHandle = () => {
    setActiveTranslation(false);
    setOnHover(true);
  };
  const aboutMeEndHoverHandle = () => {
    setActiveTranslation(true);
    setOnHover(false);
  };
  const mouseMoveHandler = ({ clientX, clientY }: IMouseMove) => {
    if (activeTranslation) {
      setTranslateX(clientX - viewportDimensions[x]);
      setTranslateY(clientY - viewportDimensions[y]);
    }
  };

  useEffect(() => {
    setHiddenLogo(false);
    setTimeout(() => {
      setRemoveWhiteScreen(true);
    }, 500);
    serViewportDimensions([window.innerWidth / 2, window.innerHeight / 2]);
  }, []);

  return (
    <div
      id={css.main}
      className={onDarkMode ? css.darkmode : ""}
      onMouseMove={mouseMoveHandler}
    >
      <div id={css.mainBackground2} />
      <div className={onDarkMode ? css.darkmode : ""} id={css.mainBackground} />
      <Header onDarkModeToggle={onDarkModeToggleHandler} />
      <div id={css.texts}>
        <div
          id={css.mainText}
          className={removeWhiteScreen ? css.removeWhiteScreen : ""}
        >
          <span>{myName}</span>
        </div>
        <div
          id={css.descriptionText}
          className={removeWhiteScreen ? css.removeWhiteScreen : ""}
        >
          <GlitchText searchTime={10} stop={200} text={myTitle} />
        </div>
        <div
          id={css.aboutMe}
          ref={aboutMeButtonRef}
          onMouseLeave={aboutMeEndHoverHandle}
          onMouseEnter={aboutMeHoverHandle}
          className={`
                        ${removeWhiteScreen ? css.removeWhiteScreen : ""}
                        ${onHover ? css.onHover : ""}
                     `}
        >
          <div id={css.aboutMeButton}>
            <span>{myAboutMe}</span>
            <div id={css.blueLayer} className={css.buttonLayer} />
            <div id={css.purpleLayer} className={css.buttonLayer} />
          </div>
          <div className={css.arrow} id={css.leftArrow}>
            <svg viewBox="0 0 512 512">
              <path d="M173.307,397.245c3.547,3.822,8.365,5.756,13.197,5.755c4.382,0,8.775-1.591,12.24-4.806l139-129   c3.67-3.406,5.756-8.187,5.756-13.194s-2.086-9.788-5.756-13.194l-139-129c-7.284-6.761-18.676-6.338-25.438,0.949   c-6.763,7.287-6.338,18.676,0.949,25.438L299.039,256L174.256,371.806C166.969,378.569,166.544,389.958,173.307,397.245z" />
            </svg>
          </div>
          <div className={css.arrow} id={css.rightArrow}>
            <svg viewBox="0 0 512 512">
              <path d="M173.307,397.245c3.547,3.822,8.365,5.756,13.197,5.755c4.382,0,8.775-1.591,12.24-4.806l139-129   c3.67-3.406,5.756-8.187,5.756-13.194s-2.086-9.788-5.756-13.194l-139-129c-7.284-6.761-18.676-6.338-25.438,0.949   c-6.763,7.287-6.338,18.676,0.949,25.438L299.039,256L174.256,371.806C166.969,378.569,166.544,389.958,173.307,397.245z" />
            </svg>
          </div>
        </div>
      </div>

      <div id={css.logotypeContainer}>
        <div id={css.logo} className={hiddenLogo ? css.hiddenLogo : ""} />
      </div>

      <div id={css.figureContainer}>
        <Figure
          fix={[20, 20]}
          translateX={translateX}
          translateY={translateY}
          left={"5vw"}
          top={"10vh"}
          type={"triangle"}
        />
        <Figure
          fix={[40, -20]}
          translateX={translateX}
          translateY={translateY}
          left={"40vw"}
          top={"4vw"}
          type={"square"}
        />
        <Figure
          fix={[-20, -20]}
          translateX={translateX}
          translateY={translateY}
          left={"8vw"}
          top={"50vh"}
          type={"circle"}
        />
        <Figure
          fix={[-20, 40]}
          translateX={translateX}
          translateY={translateY}
          left={"35vw"}
          top={"70vh"}
          type={"triangle"}
        />
        <Figure
          fix={[24, 30]}
          translateX={translateX}
          translateY={translateY}
          left={"15vw"}
          top={"80vh"}
          type={"circle"}
        />
        <Figure
          fix={[-20, -24]}
          translateX={translateX}
          translateY={translateY}
          left={"70vw"}
          top={"15vh"}
          type={"square"}
        />
        <Figure
          fix={[34, 20]}
          translateX={translateX}
          translateY={translateY}
          left={"90vw"}
          top={"20vh"}
          type={"circle"}
        />
        <Figure
          fix={[-20, 30]}
          translateX={translateX}
          translateY={translateY}
          left={"74vw"}
          top={"55vh"}
          type={"triangle"}
        />
        <Figure
          fix={[52, -20]}
          translateX={translateX}
          translateY={translateY}
          left={"90vw"}
          top={"85vh"}
          type={"square"}
        />
        <Figure
          fix={[-28, -20]}
          translateX={translateX}
          translateY={translateY}
          left={"68vw"}
          top={"90vh"}
          type={"circle"}
        />
      </div>

      <div id={css.sideBar}>
        <div className={css.socialLink} id={css.facebook}>
          <svg viewBox="0 0 5120 5120">
            <path
              id="pzCJRG6q2"
              d="M2020 3950 l0 -1170 -390 0 -390 0 0 -450 0 -450 389 0 389 0 5 -428 c5 -447 9 -502 54 -662 121 -435 435 -703 903 -770 135 -20 644 -10 853 16 l47 6 0 404 0 404 -295 0 c-176 0 -315 4 -347 11 -111 23 -196 82 -237 165 -42 82 -50 174 -51 527 l0 327 451 0 452 0 -6 38 c-3 20 -29 223 -58 450 l-53 412 -393 0 -393 0 0 1170 0 1170 -465 0 -465 0 0 -1170z"
            />
          </svg>
        </div>
        <div className={css.socialLink} id={css.instagram}>
          <svg viewBox="0 0 5120 5120">
            <path d="M1695 5109 c-537 -17 -846 -102 -1122 -307 -256 -192 -426 -468 -503 -817 -50 -230 -53 -290 -59 -1165 -9 -1155 1 -1429 60 -1694 45 -205 131 -400 239 -545 69 -91 211 -230 300 -293 197 -139 460 -227 770 -258 270 -27 2096 -28 2355 0 821 86 1269 534 1355 1355 31 287 27 2124 -4 2385 -47 389 -179 690 -400 914 -234 236 -536 363 -966 406 -168 17 -1655 31 -2025 19z m1845 -459 c379 -24 580 -84 757 -225 180 -143 284 -345 328 -635 28 -189 35 -407 35 -1215 0 -1059 -11 -1254 -81 -1468 -51 -156 -101 -240 -209 -348 -84 -84 -108 -101 -200 -147 -156 -76 -303 -114 -565 -142 -140 -16 -1622 -23 -1950 -10 -257 10 -368 22 -495 55 -447 114 -649 405 -699 1006 -15 182 -17 1962 -2 2109 35 343 111 543 270 712 189 202 415 281 875 308 204 11 1750 11 1936 0z" />
            <path d="M2416 3860 c-311 -39 -580 -173 -794 -394 -178 -184 -290 -395 -343 -649 -31 -145 -31 -371 -1 -514 38 -174 103 -329 200 -478 63 -96 258 -290 357 -354 319 -208 694 -271 1057 -177 643 168 1060 798 962 1454 -40 273 -159 514 -349 711 -196 203 -419 327 -687 381 -116 24 -300 33 -402 20z m354 -471 c294 -69 540 -312 621 -614 31 -113 31 -316 0 -430 -79 -300 -317 -537 -616 -616 -96 -26 -296 -31 -390 -10 -323 71 -583 323 -654 634 -28 120 -34 201 -21 302 41 335 264 611 576 714 162 54 312 60 484 20z" />
            <path d="M3872 1489 c-283 -55 -334 -438 -74 -566 76 -37 183 -39 252 -4 61 31 117 86 148 146 38 74 38 178 -1 257 -60 122 -197 192 -325 167z" />
          </svg>
        </div>
        <div className={css.socialLink} id={css.linkedin}>
          <svg viewBox="0 0 5120 5120">
            <path d="M580 3240 l0 -1360 420 0 420 0 0 1360 0 1360 -420 0 -420 0 0 -1360z" />
            <path d="M1970 3240 l0 -1360 400 0 400 0 0 185 c0 102 4 185 9 185 4 0 25 -26 46 -57 21 -32 70 -89 110 -128 183 -178 440 -266 730 -251 298 16 507 97 655 253 128 134 204 305 251 563 23 123 23 137 27 1048 l3 922 -420 0 -420 0 -3 -822 c-4 -817 -4 -824 -26 -903 -44 -158 -106 -241 -215 -291 -53 -24 -77 -29 -173 -32 -61 -2 -135 1 -165 7 -176 37 -283 148 -341 356 -22 79 -23 88 -26 883 l-3 802 -419 0 -420 0 0 -1360z" />
            <path d="M945 1488 c-239 -28 -426 -240 -425 -482 1 -144 41 -238 144 -342 104 -103 198 -143 342 -144 302 -1 535 285 473 582 -51 246 -286 415 -534 386z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Web_07;
