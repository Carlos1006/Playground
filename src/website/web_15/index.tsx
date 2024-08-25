import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import css from "./styles/main.module.scss";
import BlueGradient from "./components/blueGradient";
import PinkCthulhu from "./components/pinkCthulhu";
import GrayCthulhu from "./components/grayCthulhu";
import GreenCthulhu from "./components/greenCthulhu";
import BlueCthulhu from "./components/blueCthulhu";
import GrayGradient from "./components/grayGradient";
import Background from "./components/background";
import Text from "./components/text";
import Arrow from "./components/arrow";
import Disk from "./components/disk";
import {
  GoArrowUpRight as TopRightArrowIcon,
  GoArrowDown as DownArrowIcon,
} from "react-icons/go";
import IconMenu from "./components/iconMenu";
import ArrowRight from "./components/arrowRight";
import TopLink from "./components/topLink";
import Marquee from "./components/marquee";
import Header from "./components/header";

const BentoGrid: FC = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [width00, setWidth00] = useState<number>(0);
  const [height00, setHeight00] = useState<number>(0);
  const [right00, setRight00] = useState<number>(0);
  const [top00, setTop00] = useState<number>(0);
  const [remove, setRemove] = useState<number>(0);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Dark Mode Change
  const [beginDarkMode, setBeginDarkMode] = useState<boolean>(false);
  // ------------------------------

  const mainRef = useRef<HTMLDivElement>(null);

  const refElement10 = useRef<HTMLDivElement>(null);
  const refElement11 = useRef<HTMLDivElement>(null);
  const refElement13 = useRef<HTMLDivElement>(null);

  const refElement00 = useRef<HTMLDivElement>(null);
  const refElement02 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Bento Grid";
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (refElement10.current && refElement11.current) {
        setWidth(
          refElement10.current.offsetWidth +
            refElement11.current.offsetWidth +
            10
        );
      }
      if (refElement11.current && refElement13.current) {
        setHeight(
          refElement11.current.offsetHeight +
            refElement13.current.offsetHeight +
            10
        );
      }

      if (refElement00.current && refElement02.current) {
        setWidth00(refElement00.current.offsetWidth);
        setHeight00(
          refElement00.current.offsetHeight + refElement02.current.offsetHeight
        );
        setRight00(refElement02.current.offsetWidth);
        setTop00(refElement00.current.offsetHeight);
      }

      if (refElement02.current) {
        setRemove(refElement02.current.offsetWidth);
      }
    });
    if (mainRef.current) {
      observer.observe(mainRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [mainRef]);

  const onDarkModeChange = (): void => {
    setBeginDarkMode((prev) => !prev);
  };

  useLayoutEffect(() => {
    setDarkMode((prev) => !prev);
  }, [beginDarkMode]);

  useLayoutEffect(() => {
    let link: HTMLLinkElement | null =
      document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href =
      "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐙</text></svg>";
  }, []);

  return (
    <div
      className={`${darkMode ? css.darkMode : ""}`}
      id={css.main}
      ref={mainRef}
    >
      <div id={css.wrapper} className={`${darkMode ? css.darkMode : ""}`}>
        <Header darkMode={darkMode} onDarkModeChange={onDarkModeChange} />
        <div className={`${css.element00} ${darkMode ? css.darkMode0 : ""}`}>
          <div className={css.wrapper01}>
            <div className={css.wrapper02} ref={refElement00}>
              <TopLink remove={remove} />
              <div
                style={{ width: width00, height: height00 }}
                className={css.image04}
              ></div>
            </div>
          </div>
        </div>
        <div className={`${css.element01} ${darkMode ? css.darkMode0 : ""}`}>
          <div className={css.wrapper}>
            <Arrow />
            <Text />
            <Background />
          </div>
        </div>
        <div className={`${css.element02} ${darkMode ? css.darkMode0 : ""}`}>
          <div className={css.wrapper01}>
            <div className={css.wrapper02} ref={refElement02}>
              <div className={css.overflowWrapper}>
                <BlueCthulhu />
              </div>
              <GrayGradient width={width00} height={height00} />
            </div>
          </div>
        </div>
        <div
          className={`
            ${css.element10} 
            ${darkMode ? css.darkMode10 : ""}
            ${darkMode ? css.darkMode0 : ""}
          `}
        >
          <div className={css.wrapper01}>
            <div className={css.wrapper02} ref={refElement10}>
              <BlueGradient width={width} height={height} />
              <PinkCthulhu width={width} height={height} />
            </div>
          </div>
        </div>
        <div className={`${css.element11} ${darkMode ? css.darkMode0 : ""}`}>
          <div className={css.overflowWrapper01}>
            <GrayGradient
              width={width00}
              height={height00}
              right={-right00}
              top={-top00}
            />
            <div className={css.overflowWrapper02}></div>
          </div>
          <div className={css.wrapper01}>
            <div className={css.wrapper02} ref={refElement11}>
              <BlueGradient width={width} height={height} />
              <TopRightArrowIcon className={css.topRightArrowIcon} />
              <Disk />
              <PinkCthulhu width={width} height={height} />
            </div>
          </div>
        </div>
        <div className={`${css.element12} ${darkMode ? css.darkMode : ""}`}>
          <div className={css.wrapper01}>
            <BlueGradient width={width} height={height} />
            <PinkCthulhu width={width} height={height} />
          </div>
        </div>
        <div className={`${css.element13} ${darkMode ? css.darkMode : ""}`}>
          <div className={css.wrapper01} ref={refElement13}>
            <IconMenu />
            <div className={css.more}>
              <span>+10 Lorem ipsum</span>
              <ArrowRight width={"12cqmax"} />
            </div>
            <BlueGradient width={width} height={height} />
            <PinkCthulhu width={width} height={height} />
          </div>
        </div>
        <div className={`${css.element20} ${darkMode ? css.darkMode20 : ""}`}>
          <div className={css.wrapper01}>
            <div className={css.wrapper02}>
              <span>
                Click here to <br />
                learn more about <br />
                Cosmic Horror
              </span>
              <GreenCthulhu />
            </div>
          </div>
        </div>
        <div className={`${css.element30} ${darkMode ? css.darkMode : ""}`}>
          <div className={css.wrapper01}>
            <div className={css.wrapper02}>
              <span>
                Read More <DownArrowIcon />
              </span>
            </div>
          </div>
        </div>
        <div className={`${css.element40} ${darkMode ? css.darkMode : ""}`}>
          <div className={css.wrapper01}>
            <div className={css.wrapper02}>
              <GrayCthulhu />
            </div>
          </div>
        </div>
        <div className={`${css.element41} ${darkMode ? css.darkMode : ""}`}>
          <div className={css.wrapper01}>
            <div className={css.wrapper02}>
              <GrayCthulhu />
            </div>
          </div>
        </div>
        <div className={`${css.element42} ${darkMode ? css.darkMode : ""}`}>
          <div className={css.wrapper01}>
            <GrayCthulhu />
          </div>
        </div>
        <div className={`${css.footer} ${darkMode ? css.darkMode : ""}`}>
          <div className={css.overflowWrapper} />
          <div className={css.wrapper}>
            <Marquee />
          </div>
        </div>
        <div className={`${css.gap} ${darkMode ? css.darkMode : ""}`} />
      </div>
    </div>
  );
};

export default BentoGrid;
