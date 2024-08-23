import { FC, useEffect, useRef, useState } from "react";
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
import { sleep } from "../../utils";

const BentoGrid: FC = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [width00, setWidth00] = useState<number>(0);
  const [height00, setHeight00] = useState<number>(0);
  const [right00, setRight00] = useState<number>(0);
  const [top00, setTop00] = useState<number>(0);
  const [remove, setRemove] = useState<number>(0);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Dark Mode Change
  const [changingDarkMode, setChangingDarkMode] = useState<boolean>(false);
  const [headerDarkMode, setHeaderDarkMode] = useState<boolean>(false);
  const [element00DarkMode, setElement00DarkMode] = useState<boolean>(false);
  const [element01DarkMode, setElement01DarkMode] = useState<boolean>(false);
  const [element02DarkMode, setElement02DarkMode] = useState<boolean>(false);
  const [element10DarkMode, setElement10DarkMode] = useState<boolean>(false);
  const [element11DarkMode, setElement11DarkMode] = useState<boolean>(false);
  const [element12DarkMode, setElement12DarkMode] = useState<boolean>(false);
  const [element13DarkMode, setElement13DarkMode] = useState<boolean>(false);
  const [element20DarkMode, setElement20DarkMode] = useState<boolean>(false);
  const [element30DarkMode, setElement30DarkMode] = useState<boolean>(false);
  const [element40DarkMode, setElement40DarkMode] = useState<boolean>(false);
  const [element41DarkMode, setElement41DarkMode] = useState<boolean>(false);
  const [element42DarkMode, setElement42DarkMode] = useState<boolean>(false);
  const [footerDarkMode, setFooterDarkMode] = useState<boolean>(false);
  const [gapDarkMode, setGapDarkMode] = useState<boolean>(false);
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

  const onDarkModeChange = async (): Promise<void> => {
    if (changingDarkMode) return;
    setChangingDarkMode(true);
    const newMode = !darkMode;
    setDarkMode(newMode);
    setHeaderDarkMode(newMode);
    await sleep(200);

    setChangingDarkMode(false);
  };

  return (
    <div
      className={`${darkMode ? css.darkMode : ""}`}
      id={css.main}
      ref={mainRef}
    >
      <div id={css.wrapper} className={`${darkMode ? css.darkMode : ""}`}>
        <Header darkMode={headerDarkMode} onDarkModeChange={onDarkModeChange} />
        <div
          className={`
            ${css.element00} ${element00DarkMode ? css.darkMode : ""}`}
        >
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
        <div
          className={`
            ${css.element01} ${element01DarkMode ? css.darkMode : ""}`}
        >
          <div className={css.wrapper}>
            <Arrow />
            <Text />
            <Background />
          </div>
        </div>
        <div
          className={`
            ${css.element02} ${element02DarkMode ? css.darkMode : ""}`}
        >
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
            ${css.element10} ${element10DarkMode ? css.darkMode : ""}`}
        >
          <div className={css.wrapper01}>
            <div className={css.wrapper02} ref={refElement10}>
              <BlueGradient width={width} height={height} />
              <PinkCthulhu width={width} height={height} />
            </div>
          </div>
        </div>
        <div
          className={`
            ${css.element11} ${element11DarkMode ? css.darkMode : ""}`}
        >
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
        <div
          className={`
            ${css.element12} ${element12DarkMode ? css.darkMode : ""}`}
        >
          <div className={css.wrapper01}>
            <BlueGradient width={width} height={height} />
            <PinkCthulhu width={width} height={height} />
          </div>
        </div>
        <div
          className={`
            ${css.element13} ${element13DarkMode ? css.darkMode : ""}`}
        >
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
        <div
          className={`
            ${css.element20} ${element20DarkMode ? css.darkMode : ""}`}
        >
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
        <div
          className={`
            ${css.element30} ${element30DarkMode ? css.darkMode : ""}`}
        >
          <div className={css.wrapper01}>
            <div className={css.wrapper02}>
              <span>
                Read More <DownArrowIcon />
              </span>
            </div>
          </div>
        </div>
        <div
          className={`
            ${css.element40} ${element40DarkMode ? css.darkMode : ""}`}
        >
          <div className={css.wrapper01}>
            <div className={css.wrapper02}>
              <GrayCthulhu />
            </div>
          </div>
        </div>
        <div
          className={`
            ${css.element41} ${element41DarkMode ? css.darkMode : ""}`}
        >
          <div className={css.wrapper01}>
            <div className={css.wrapper02}>
              <GrayCthulhu />
            </div>
          </div>
        </div>
        <div
          className={`
            ${css.element42} ${element42DarkMode ? css.darkMode : ""}`}
        >
          <div className={css.wrapper01}>
            <GrayCthulhu />
          </div>
        </div>
        <div className={`${css.footer} ${footerDarkMode ? css.darkMode : ""}`}>
          <div className={css.overflowWrapper} />
          <div className={css.wrapper}>
            <Marquee />
          </div>
        </div>
        <div className={`${css.gap} ${gapDarkMode ? css.darkMode : ""}`} />
      </div>
    </div>
  );
};

export default BentoGrid;
