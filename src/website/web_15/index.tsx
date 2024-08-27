import { FC, useRef, useState } from "react";
import css from "./styles/main.module.scss";
import BlueGradient from "./components/blueGradient";
import PinkCthulhu from "./components/pinkCthulhu";
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
import { useFavicon } from "./hooks/useFavicon";
import { useDarkMode } from "./hooks/useDarkMode";
import { useResizeObserver } from "./hooks/useObserver";
import { DimensionProps, RightTopProps } from "./types";
import { DEFAULT_DIM, DEFAULT_RIGHT_TOP, GAP } from "./constants";
import GrayCthulhu2 from "./components/grayCthulhu2";

const BentoGrid: FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  const [element1, setElement1] = useState<DimensionProps>(DEFAULT_DIM);
  const [element0Link, setElement0Link] = useState<DimensionProps>(DEFAULT_DIM);

  const [element0Compensation, setElement0Compensation] =
    useState<RightTopProps>(DEFAULT_RIGHT_TOP);
  const [removeTopLinkWidth, setRemoveTopLinkWidth] = useState<number>(0);

  const refElement10 = useRef<HTMLDivElement>(null);
  const refElement11 = useRef<HTMLDivElement>(null);
  const refElement12 = useRef<HTMLDivElement>(null);
  const refElement13 = useRef<HTMLDivElement>(null);

  const refElement00 = useRef<HTMLDivElement>(null);
  const refElement02 = useRef<HTMLDivElement>(null);

  const refElement40 = useRef<HTMLDivElement>(null);
  const refElement41 = useRef<HTMLDivElement>(null);
  const refElement42 = useRef<HTMLDivElement>(null);
  const refElement42Wrapper = useRef<HTMLDivElement>(null);

  const [element4Side, setElement4Side] = useState<number>(0);
  const [grayCthulhuWidth, setGrayCthulhuWidth] = useState<number>(0);
  const [grayCthulhu41Left, setGrayCthulhu41Left] = useState<number>(0);
  const [grayCthulhu42Left, setGrayCthulhu42Left] = useState<number>(0);

  useResizeObserver({
    target: mainRef,
    callback: () => {
      // ? CALCULATE ELEMENT 1 WIDTH AND HEIGHT
      let element1Width = 0;
      let element1Height = 0;
      if (refElement10.current && refElement11.current) {
        element1Width =
          refElement10.current.offsetWidth +
          refElement11.current.offsetWidth +
          GAP;
      }
      if (refElement11.current && refElement13.current) {
        element1Height =
          refElement11.current.offsetHeight +
          refElement13.current.offsetHeight +
          GAP;
      }
      setElement1({ width: element1Width, height: element1Height });

      // *-----------------------------------------------------------------------

      // ? CALCULATE ELEMENT 0 WIDTH AND HEIGHT
      let element0LinkWidth = 0;
      let element0LinkHeight = 0;
      let element0LinkTopCompensation = 0;
      let element0LinkRightCompensation = 0;
      if (refElement00.current && refElement02.current) {
        element0LinkWidth = refElement00.current.offsetWidth;
        element0LinkHeight =
          refElement00.current.offsetHeight + refElement02.current.offsetHeight;
        // ? COMPENSATE FOR THE TOP AND RIGHT POSITION OF THE LINK
        element0LinkTopCompensation = -refElement00.current.offsetHeight;
        element0LinkRightCompensation = -refElement02.current.offsetWidth;
      }
      setElement0Link({ width: element0LinkWidth, height: element0LinkHeight });
      setElement0Compensation({
        right: element0LinkRightCompensation,
        top: element0LinkTopCompensation,
      });

      // *-----------------------------------------------------------------------

      // ? REMOVE TOP LINK WIDTH
      let removeTopLinkWidth = 0;
      if (refElement02.current) {
        removeTopLinkWidth = refElement02.current.offsetWidth;
      }
      setRemoveTopLinkWidth(removeTopLinkWidth);

      // *-----------------------------------------------------------------------

      if (refElement42.current) {
        const minSide = Math.min(
          refElement42.current.offsetWidth,
          refElement42.current.offsetHeight
        );
        setElement4Side(minSide);

        if (
          refElement40.current &&
          refElement41.current &&
          refElement42Wrapper.current
        ) {
          const rect40 = refElement40.current.getBoundingClientRect();
          const rect41 = refElement41.current.getBoundingClientRect();
          const rect42Wrapper =
            refElement42Wrapper.current.getBoundingClientRect();

          const fullWidth = rect42Wrapper.left + minSide - rect40.left;

          const leftElement41 = rect41.left - rect40.left;
          const leftElement42 = rect42Wrapper.left - rect40.left;

          setGrayCthulhuWidth(fullWidth);
          setGrayCthulhu41Left(-leftElement41);
          setGrayCthulhu42Left(-leftElement42);
        }
      }
    },
  });

  useFavicon();
  const { darkMode, onDarkModeChange } = useDarkMode();

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
              <TopLink remove={removeTopLinkWidth} />
              <div style={element0Link} className={css.image04}></div>
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
              <GrayGradient {...element0Link} />
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
              <BlueGradient {...element1} />
              <PinkCthulhu {...element1} />
            </div>
          </div>
        </div>
        <div className={`${css.element11} ${darkMode ? css.darkMode0 : ""}`}>
          <div className={css.overflowWrapper01}>
            <GrayGradient {...element0Link} {...element0Compensation} />
            <div className={css.overflowWrapper02}></div>
          </div>
          <div className={css.wrapper01}>
            <div className={css.wrapper02} ref={refElement11}>
              <BlueGradient {...element1} />
              <TopRightArrowIcon className={css.topRightArrowIcon} />
              <Disk />
              <PinkCthulhu {...element1} />
            </div>
          </div>
        </div>
        <div className={`${css.element12} ${darkMode ? css.darkMode : ""}`}>
          <div className={css.wrapper01} ref={refElement12}>
            <BlueGradient {...element1} />
            <PinkCthulhu {...element1} />
          </div>
        </div>
        <div className={`${css.element13} ${darkMode ? css.darkMode : ""}`}>
          <div className={css.wrapper01} ref={refElement13}>
            <IconMenu />
            <div className={css.more}>
              <span>+10 Lorem ipsum</span>
              <ArrowRight width={"12cqmax"} />
            </div>
            <BlueGradient {...element1} />
            <PinkCthulhu {...element1} />
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
          <div className={css.wrapper01} ref={refElement40}>
            <GrayCthulhu2
              squareSide={element4Side}
              left={0}
              width={grayCthulhuWidth}
            />
          </div>
        </div>
        <div className={`${css.element41} ${darkMode ? css.darkMode : ""}`}>
          <div className={css.wrapper01} ref={refElement41}>
            <GrayCthulhu2
              squareSide={element4Side}
              left={grayCthulhu41Left}
              width={grayCthulhuWidth}
            />
          </div>
        </div>
        <div className={`${css.element42} ${darkMode ? css.darkMode : ""}`}>
          <div className={css.wrapper01} ref={refElement42}>
            <GrayCthulhu2
              ref={refElement42Wrapper}
              squareSide={element4Side}
              left={grayCthulhu42Left}
              width={grayCthulhuWidth}
            />
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
// "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
