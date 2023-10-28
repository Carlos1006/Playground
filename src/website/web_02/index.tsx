import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import css from "./style/main.module.scss";
import { MAX, PROFILES } from "./constants";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

type Orientation = "top" | "left" | "right" | "bottom";

function getNextOrientationClockwise(orientation: Orientation): Orientation {
  switch (orientation) {
    case "top":
      return "right";
    case "right":
      return "bottom";
    case "bottom":
      return "left";
    case "left":
      return "top";
  }
}

function getPrevOrientationClockwise(orientation: Orientation): Orientation {
  switch (orientation) {
    case "top":
      return "left";
    case "right":
      return "top";
    case "bottom":
      return "right";
    case "left":
      return "bottom";
  }
}

const Web_02: React.FC = () => {
  const vw = useRef<number>(window.innerWidth / 100);
  const vh = useRef<number>(window.innerHeight / 100);

  const width = useMemo(
    () => 60 * vh.current + (100 * vw.current - 180 * vh.current) / 2,
    [vw, vh]
  );
  const centerScroll = useMemo(() => width, [width]);
  const leftScroll = 0;
  const rightScroll = useMemo(() => width * 2, [width]);

  const vw33 = useMemo(() => 33.333 * vw.current, [vw]);
  const vw16 = useMemo(() => 16.665 * vw.current, [vw]);
  const vw16_90 = useMemo(() => 16.665 * vw.current * 0.9, [vw]);
  const vwRest = useMemo(() => vw16 - vw16_90, [vw16, vw16_90]);

  const visorRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState<number>(0);
  const [current, setCurrent] = useState<number>(0);
  const [topText, setTopText] = useState<string>(PROFILES[0].name);
  const [rightText, setRightText] = useState<string>(PROFILES[1].name);
  const [bottomText, setBottomText] = useState<string>(PROFILES[2].name);
  const [leftText, setLeftText] = useState<string>(PROFILES[19].name);
  const [orientation, setOrientation] = useState<Orientation>("top");
  const [canClick, setCanClick] = useState<boolean>(true);

  const [movingRight, setMovingRight] = useState<boolean>(false);
  const [movingLeft, setMovingLeft] = useState<boolean>(false);

  // 1.5em = 2.7
  // 1.7em = 3.06
  const ROTATE_RATIO = 2.8;

  const angle1 = useMemo(() => {
    return topText.length * ROTATE_RATIO;
  }, [topText]);

  const angle2 = useMemo(() => {
    return rightText.length * ROTATE_RATIO;
  }, [rightText]);

  const angle3 = useMemo(() => {
    return bottomText.length * ROTATE_RATIO;
  }, [bottomText]);

  const angle4 = useMemo(() => {
    return leftText.length * ROTATE_RATIO;
  }, [leftText]);

  const duration = useRef<number>(500); // Duración de la animación en milisegundos
  const start = useRef<number>(centerScroll);
  const target = useRef<number>(centerScroll);
  const startTime = useRef<number>(performance.now());

  function easeInOut(t: number, b: number, c: number, d: number): number {
    // Función de aceleración (puedes usar otra si prefieres)
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  const scrollToValue = (value: number) => {
    if (visorRef.current) {
      start.current = visorRef.current.scrollLeft;
      target.current = value;
      startTime.current = performance.now();

      const animateScroll = (currentTime: number) => {
        const elapsedTime = currentTime - startTime.current;
        if (visorRef.current) {
          visorRef.current.scrollLeft = easeInOut(
            elapsedTime,
            start.current,
            target.current - start.current,
            duration.current
          );
          if (elapsedTime < duration.current) {
            requestAnimationFrame(animateScroll);
          }
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  useEffect(() => {
    if (visorRef.current) {
      visorRef.current.scrollLeft = centerScroll;
    }
  }, [centerScroll, visorRef]);

  const changeName = useCallback(
    (nextOrientation: Orientation, hidden: number) => {
      const hiddenName = PROFILES[hidden].name;
      console.log({ hidden, nextOrientation, hiddenName });
      if (nextOrientation === "right") {
        setLeftText(hiddenName);
      } else if (nextOrientation === "bottom") {
        setTopText(hiddenName);
      } else if (nextOrientation === "left") {
        setRightText(hiddenName);
      } else if (nextOrientation === "top") {
        setBottomText(hiddenName);
      }
    },
    []
  );

  const onNext = async () => {
    if (!canClick) return;
    setCanClick(false);
    setAngle(angle - 90);
    const nexOrientation = getNextOrientationClockwise(orientation);
    const next = current + 1 >= MAX ? 0 : current + 1;
    const nextHidden = next + 1 >= MAX ? 0 : next + 1;
    changeName(orientation, nextHidden);
    setOrientation(nexOrientation);
    scrollToValue(rightScroll);
    setMovingRight(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setCurrent(next);
    visorRef.current?.scrollTo({
      left: centerScroll,
      behavior: "instant",
    });
    setMovingRight(false);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setCanClick(true);
  };

  const onPrev = async () => {
    if (!canClick) return;
    setCanClick(false);
    setAngle(angle + 90);
    const prevOrientation = getPrevOrientationClockwise(orientation);
    console.log(prevOrientation);
    const prev = current - 1 < 0 ? MAX - 1 : current - 1;
    const prevHidden = prev - 1 < 0 ? MAX - 1 : prev - 1;
    changeName(orientation, prevHidden);
    setOrientation(prevOrientation);
    scrollToValue(leftScroll);
    setMovingLeft(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setCurrent(prev);
    visorRef.current?.scrollTo({
      left: centerScroll,
      behavior: "instant",
    });
    setMovingLeft(false);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setCanClick(true);
  };

  const prevImg: number = useMemo(() => {
    return current - 1 < 0 ? MAX - 1 : current - 1;
  }, [current]);

  const prevprevImg: number = useMemo(() => {
    return prevImg - 1 < 0 ? MAX - 1 : prevImg - 1;
  }, [prevImg]);

  const nextImg: number = useMemo(() => {
    return current + 1 >= MAX ? 0 : current + 1;
  }, [current]);

  const nextnextImg: number = useMemo(() => {
    return nextImg + 1 >= MAX ? 0 : nextImg + 1;
  }, [nextImg]);

  return (
    <div id={css.main}>
      <div id={css.roof}>
        <div className={css.header}>
          {/* <button onClick={onClick}>change name</button> */}
          <div className={css.item}>
            <span>About Us</span>
          </div>
          <div className={css.item}>
            <span>Contact</span>
          </div>
          <div id={css.mainItem} className={css.item}>
            <span>Home</span>
          </div>
          <div className={css.item}>
            <span>Services</span>
          </div>
          <div className={css.item}>
            <span>Portfolio</span>
          </div>
        </div>
      </div>
      <div ref={visorRef} id={css.visorContainer}>
        <div id={css.navLeft} className={css.navigator} onClick={onPrev}>
          <BsChevronLeft />
        </div>
        <div id={css.navRight} className={css.navigator} onClick={onNext}>
          <BsChevronRight />
        </div>
        <div
          id={css.visor}
          className={movingLeft || movingRight ? css.blur : ""}
        >
          <div className={`${css.card} ${css.shadow}`}>
            <img src={PROFILES[prevprevImg].image} />
            <div className={css.screen} />
          </div>
          <div
            className={`${css.card} ${css.shadow} ${
              movingLeft ? css.fade : ""
            }`}
          >
            <img src={PROFILES[prevImg].image} />
            <div className={css.screen} />
          </div>
          <div
            className={`${css.card} ${
              movingLeft || movingRight ? css.tint : ""
            }`}
          >
            <img src={PROFILES[current].image} />
            <div className={css.screen} />
          </div>
          <div
            className={`${css.card} ${css.shadow} ${
              movingRight ? css.fade : ""
            }`}
          >
            <img src={PROFILES[nextImg].image} />
            <div className={css.screen} />
          </div>
          <div className={`${css.card} ${css.shadow}`}>
            <img src={PROFILES[nextnextImg].image} />
            <div className={css.screen} />
          </div>
        </div>
      </div>
      <div id={css.spinner}>
        <div id={css.spinnerMessage}>
          <span>Choose your character</span>
        </div>
        <div id={css.wheel} style={{ rotate: `${angle}deg` }}>
          <div id={css.points}>
            <div className={css.point}></div>
            <div className={css.point}></div>
            <div className={css.point}></div>
            <div className={css.point}></div>
          </div>
          <svg width={vw33} height={vw33} viewBox={`0 0 ${vw33} ${vw33}`}>
            {/* Top Text */}
            <path
              id={"circlePath"}
              className={css.circle}
              d={`M ${vw16},${vwRest} A ${vw16_90},${vw16_90} 0 1,1 ${
                vw16 - 0.01
              },${vwRest}`}
            />
            <text
              x={0}
              y={0}
              className={css.text}
              transform={`rotate(${-angle1} ${vw16} ${vw16})`}
            >
              <textPath href={`#circlePath`}>{topText}</textPath>
            </text>

            {/* RIGHT Text */}
            <path
              id={"circlePath2"}
              className={css.circle}
              d={`M ${vw33 - vwRest},${vw16} A ${vw16_90},${vw16_90} 0 1,1 ${
                vw33 - vwRest
              },${vw16 - 0.1}`}
            />
            <text
              x={0}
              y={0}
              className={css.text}
              transform={`rotate(${-angle2} ${vw16} ${vw16})`}
            >
              <textPath href={`#circlePath2`}>{rightText}</textPath>
            </text>

            {/* Bottom Text */}
            <g transform={`rotate(${180} ${vw16} ${vw16})`}>
              <path
                id={"circlePath3"}
                className={css.circle}
                d={`M ${vw16},${vwRest} A ${vw16_90},${vw16_90} 0 1,1 ${
                  vw16 - 0.01
                },${vwRest}`}
              />
              <text
                transform={`rotate(${-angle3} ${vw16} ${vw16})`}
                x={0}
                y={0}
                className={css.text}
              >
                <textPath href={`#circlePath3`}>{bottomText}</textPath>
              </text>
            </g>
            {/* LEFT Text */}
            <g transform={`rotate(${180} ${vw16} ${vw16})`}>
              <path
                id={"circlePath2"}
                className={css.circle}
                d={`M ${vw33 - vwRest},${vw16} A ${vw16_90},${vw16_90} 0 1,1 ${
                  vw33 - vwRest
                },${vw16 - 0.1}`}
              />
              <text
                x={0}
                y={0}
                className={css.text}
                transform={`rotate(${-angle4} ${vw16} ${vw16})`}
              >
                <textPath href={`#circlePath2`}>{leftText}</textPath>
              </text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Web_02;
