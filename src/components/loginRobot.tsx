import React, {
  ReactNode,
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import css from "../styles/loginRobot.module.scss";
import { FaUserAlt } from "react-icons/fa";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { SiWire } from "react-icons/si";
import { BiCross } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";

interface IRobotGripper {
  className: string;
  show: boolean;
  open?: boolean;
}

interface IRobotEye {
  children: ReactNode; // Gripper slot
  className: string;
  semiCloseTop: boolean;
  semiCloseBottom?: boolean;
  redEyes: boolean;
  brightest: boolean;
}

interface IRobotLigbtBulb {
  brightLevel: 0 | 1 | 2 | 3 | 4 | 5;
}

interface IRobotMouth {
  redMouth: boolean;
  blueMouth: boolean;
}

type Coord = { x: number; y: number };
type Limit = { min: number; max: number };

const Teeth = 5;
const ArmLines = 10;
const xLimits: Limit = { min: -25, max: 3 };
const yLimits: Limit = { min: -10, max: 8 };
const baseClip = 90;
const FaceTransition = Number(css.faceTransition);

const contextDefault = {
  mousePosition: { x: 0, y: 0 } as Coord,
  lockPosition: false as boolean,
  focusPassword: false as boolean,
  hoverPassword: false as boolean,
  spy: false as boolean,
  hoverRecover: false as boolean,
  hoverSubmit: false as boolean,
  anim: true as boolean,
  success: 0 as 0 | 1 | 2,
  hide: false as boolean,
};
const LoginContext = createContext(contextDefault);

const useDebounce = (value: number, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const EmulateResponse = async (): Promise<1 | 2> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const success = Math.random() > 0.5;
  return success ? 1 : 2;
};

const RobotMouth: React.FC<IRobotMouth> = memo(
  ({ redMouth, blueMouth }: IRobotMouth) => {
    const [active, setActive] = useState<number>(0);
    const interval = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
      interval.current = setInterval(() => {
        setActive((prev) => (prev === Teeth - 1 ? 0 : prev + 1));
      }, 250);
      return () => clearInterval(interval?.current ?? 0);
    }, []);

    return (
      <div
        className={`
        ${css.mouth} 
        ${redMouth ? css.redMouth : ""} 
        ${blueMouth ? css.blueMouth : ""}
      `}
      >
        {Array(Teeth)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={`${css.tooth} ${active === i ? css.active : ""}`}
            />
          ))}
      </div>
    );
  }
);

const RobotGripper: React.FC<IRobotGripper> = memo(
  ({ className, show, open = false }: IRobotGripper) => {
    return (
      <>
        <div
          className={`
                  ${css.hand} 
                  ${open ? css.openGripper : ""}
                  ${show ? css.show : ""} 
                  ${className}`}
        >
          <div className={`${css.gripperTop} ${css.gripper}`} />
          <div className={css.gripperPivot} />
          <div className={`${css.gripperBottom} ${css.gripper}`} />
          <div className={css.arm}>
            {Array(ArmLines)
              .fill(0)
              .map((_, i) => (
                <div key={i} className={css.armLine} />
              ))}
          </div>
        </div>
      </>
    );
  }
);

const RobotEye: React.FC<IRobotEye> = memo(
  ({
    children: gripper,
    className,
    semiCloseTop,
    semiCloseBottom,
    redEyes,
    brightest,
  }: IRobotEye) => {
    return (
      <>
        <div
          className={`
            ${css.eye} 
            ${semiCloseTop ? css.darker : ""} 
            ${semiCloseBottom ? css.brighter : ""} 
            ${redEyes ? css.redEyes : ""}
            ${brightest ? css.brightest : ""}
            ${className}
          `}
        >
          <div className={css.eyelidContainer}>
            <div
              className={`
                ${css.eyelid} 
                ${css.top} 
                ${semiCloseTop ? css.semiCloseTop : ""}
                `}
            />
            <div
              className={`
              ${css.eyelid} 
              ${css.bottom}
              ${semiCloseBottom || brightest ? css.semiCloseBottom : ""}
            `}
            />
          </div>
          <div className={css.eyeBright} />
          {gripper}
        </div>
      </>
    );
  }
);

const RobotLightBulb: React.FC<IRobotLigbtBulb> = memo(
  ({ brightLevel = 0 }: IRobotLigbtBulb) => {
    return (
      <>
        <div className={css.bulb}>
          <div
            className={`
            ${css.light}
            ${css[`level${brightLevel}`]}
          `}
          >
            <div className={css.lightBright} />
            <SiWire className={css.wire} />
          </div>
          <div className={css.socket}></div>
        </div>
      </>
    );
  }
);

const Robot: React.FC = () => {
  const robotRef = useRef<HTMLDivElement>(null);
  const {
    mousePosition,
    focusPassword,
    hoverPassword,
    spy,
    hoverRecover,
    hoverSubmit,
    anim,
    success,
    hide,
  } = useContext(LoginContext);
  const [temporalLevel, setTemporalLevel] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [closeEyes, setCloseEyes] = useState<boolean>(false);
  const [mouthRed, setMouthRed] = useState<boolean>(false);
  const [mouthBlue, setMouthBlue] = useState<boolean>(false);

  const mouseX = mousePosition.x;
  const mouseY = mousePosition.y;

  const moveX = useMemo(() => {
    const move = mouseX / 5;
    return move > xLimits.max
      ? xLimits.max
      : move < xLimits.min
      ? xLimits.min
      : move;
  }, [mouseX]);

  const moveY = useMemo(() => {
    const move = mouseY / 10;
    return move > yLimits.max
      ? yLimits.max
      : move < yLimits.min
      ? yLimits.min
      : move;
  }, [mouseY]);

  const debouncedX = useDebounce(moveX, FaceTransition);
  const debouncedY = useDebounce(moveY, FaceTransition);

  const clipPath = useMemo(() => {
    const value = baseClip + debouncedX / 3;
    return `polygon(${value}% 0, 100% 0, 100% 100%, ${value}% 100%)`;
  }, [debouncedX]);

  const transform = useMemo(() => {
    return `translate(${debouncedX}px, ${debouncedY}px)`;
  }, [debouncedX, debouncedY]);

  const blind = useMemo(() => {
    return focusPassword || hoverPassword;
  }, [focusPassword, hoverPassword]);

  const temporalLight = async (level: 0 | 1 | 2 | 3 | 4 | 5) => {
    setTemporalLevel(level);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setTemporalLevel(0);
  };

  const errorAnim = async () => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    setTemporalLevel(3);
    setCloseEyes(true);
    setMouthRed(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setTemporalLevel(0);
    setCloseEyes(false);
    setMouthRed(false);
  };

  const successAnim = async () => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    setTemporalLevel(4);
    setMouthBlue(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setTemporalLevel(0);
    setMouthBlue(false);
  };

  useEffect(() => {
    if (hoverSubmit) {
      temporalLight(1);
    }
  }, [hoverSubmit]);

  useEffect(() => {
    if (hoverRecover) {
      temporalLight(2);
    }
  }, [hoverRecover]);

  useEffect(() => {
    if (!anim) {
      if (success == 1) {
        errorAnim();
      } else if (success == 2) {
        successAnim();
      }
    }
  }, [anim, success]);

  const brightLevel = useMemo(() => {
    if (anim) {
      return temporalLevel;
    }
    if (success !== 0 && !anim) {
      return temporalLevel;
    }
    return 0;
  }, [temporalLevel, success, anim]);

  return (
    <div id={css.robot} ref={robotRef}>
      <div className={`${css.body} ${hide ? css.hide : ""}`}>
        <div
          className={`${css.angryIcon} ${
            !anim && success === 1 ? css.show : css.hide
          }`}
        >
          <BiCross />
        </div>
        <div
          className={`${css.checkIcon} ${
            !anim && success === 2 ? css.show : css.hide
          }`}
        >
          <FaCheck />
        </div>
        <div className={css.color} style={{ clipPath }} />
        <RobotLightBulb brightLevel={brightLevel} />
        <div className={css.face} style={{ transform }}>
          <div
            className={`
              ${blind && anim ? css.eyesOff : ""}
              ${spy && anim ? css.oneEyeOn : ""}
              ${css.eyesContainer}`}
          >
            <RobotEye
              className={css.left}
              brightest={success === 2 && !anim}
              semiCloseBottom={(hoverSubmit && anim) || closeEyes}
              semiCloseTop={(hoverRecover && anim) || closeEyes}
              redEyes={closeEyes}
            >
              <RobotGripper
                className={css.leftHand}
                show={blind && anim}
                open={spy}
              />
            </RobotEye>

            <RobotEye
              className={css.right}
              brightest={success === 2 && !anim}
              semiCloseBottom={(hoverSubmit && anim) || closeEyes}
              semiCloseTop={(hoverRecover && anim) || closeEyes}
              redEyes={closeEyes}
            >
              <RobotGripper className={css.rightHand} show={blind && anim} />
            </RobotEye>
          </div>
          <RobotMouth redMouth={mouthRed} blueMouth={mouthBlue} />
        </div>
      </div>
    </div>
  );
};

const LoginRobot: React.FC = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [mousePosition, setMousePosition] = useState<Coord>({ x: 0, y: 0 });
  const [robotPosition, setRobotPosition] = useState<Coord>({ x: 0, y: 0 });
  const [lockedPosition, setLockedPosition] = useState<Coord>({ x: 0, y: 0 });
  const [lockPosition, setLockPosition] = useState<boolean>(false);
  const [focusPassword, setFocusPassword] = useState<boolean>(false);
  const [hoverPassword, setHoverPassword] = useState<boolean>(false);
  const [eye, setEye] = useState<boolean>(false);
  const [hoverRecover, setHoverRecover] = useState<boolean>(false);
  const [hoverSubmit, setHoverSubmit] = useState<boolean>(false);
  const [anim, setAnim] = useState<boolean>(true);
  const [success, setSuccess] = useState<0 | 1 | 2>(0);
  const [hideRobot, setHideRobot] = useState<boolean>(false);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      const x = e.clientX - robotPosition.x;
      const y = e.clientY - robotPosition.y;
      setMousePosition({ x, y });
    },
    [robotPosition]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [handleMove]);

  useEffect(() => {
    const robot = document.getElementById(css.robot);
    if (!robot) return;
    const { x, y, width, height } = robot.getBoundingClientRect();
    setRobotPosition({ x: x + width / 2, y: y + height / 2 });
  }, []);

  const onUserFocus = useCallback(() => {
    const { x, y } = userRef.current?.getBoundingClientRect() as DOMRect;
    const newX = x - robotPosition.x;
    const newY = y - robotPosition.y - 90; // compensacion para que haya cambio de posicion en el rostro
    setLockedPosition({ x: newX, y: newY });
    setLockPosition(true);
  }, [robotPosition.x, robotPosition.y]);

  const onPasswordFocus = useCallback(() => {
    const { x, y } = passwordRef.current?.getBoundingClientRect() as DOMRect;
    const newX = x - robotPosition.x;
    const newY = y - robotPosition.y + 200; // compensacion para que haya cambio de posicion en el rostro
    setLockedPosition({ x: newX, y: newY });
    setFocusPassword(true);
    setLockPosition(true);
  }, [robotPosition.x, robotPosition.y]);

  const onUserBlur = () => {
    setLockPosition(false);
  };

  const onPasswordBlur = () => {
    setLockPosition(false);
    setFocusPassword(false);
  };

  const onPasswordMouseEnter = () => {
    setHoverPassword(true);
  };

  const onPasswordMouseLeave = () => {
    setHoverPassword(false);
  };

  const onRecoverMouseEnter = () => {
    setHoverRecover(true);
  };

  const onRecoverMouseLeave = () => {
    setHoverRecover(false);
  };

  const onSubmitMouseEnter = () => {
    setHoverSubmit(true);
  };

  const onSubmitMouseLeave = () => {
    setHoverSubmit(false);
  };

  const onSubmit = async (): Promise<void> => {
    setLockedPosition(robotPosition);
    setLockPosition(true);
    setAnim(false);
    const success = await EmulateResponse();
    setSuccess(success);
    await new Promise((resolve) => setTimeout(resolve, 1350));
    setAnim(true);
    setLockPosition(false);
    if (success == 2) {
      alert("Welcome!");
      setHideRobot(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
    } else if (success == 1) {
      alert("Wrong password");
    }
    setSuccess(0);
  };

  const value = {
    mousePosition: lockPosition ? lockedPosition : mousePosition,
    lockPosition,
    focusPassword,
    hoverPassword,
    spy: eye,
    hoverRecover,
    hoverSubmit,
    anim,
    success,
    hide: hideRobot,
  };

  return (
    <LoginContext.Provider value={value}>
      <div id={css.loginRobot}>
        <div id={css.robotContainer}>
          <Robot />
        </div>
        <div className={css.input} ref={userRef}>
          <input
            placeholder="User..."
            onFocus={onUserFocus}
            onBlur={onUserBlur}
          />
          <div className={css.icon}>
            <FaUserAlt />
          </div>
        </div>
        <div
          className={css.input}
          ref={passwordRef}
          onMouseEnter={onPasswordMouseEnter}
          onMouseLeave={onPasswordMouseLeave}
        >
          <input
            placeholder="Password..."
            type={eye ? "text" : "password"}
            onFocus={onPasswordFocus}
            onBlur={onPasswordBlur}
          />
          <div className={`${css.icon} ${css.eye}`}>
            {eye ? (
              <AiFillEyeInvisible onClick={() => setEye(!eye)} />
            ) : (
              <AiFillEye onClick={() => setEye(!eye)} />
            )}
          </div>
        </div>
        <button
          id={css.submit}
          onMouseEnter={onSubmitMouseEnter}
          onMouseLeave={onSubmitMouseLeave}
          onClick={onSubmit}
        >
          <span>Ready</span>
        </button>
        <a id={css.forgotPassword}>
          <span
            onMouseEnter={onRecoverMouseEnter}
            onMouseLeave={onRecoverMouseLeave}
          >
            Forgot password?
          </span>
        </a>
      </div>
    </LoginContext.Provider>
  );
};

export default LoginRobot;
