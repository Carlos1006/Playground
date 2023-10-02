import React, {
  createContext,
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

type Coord = { x: number; y: number };
type Limit = { min: number; max: number };

const Teeth = 5;
const xLimits: Limit = { min: -25, max: 3 };
const yLimits: Limit = { min: -10, max: 3 };
const baseClip = 90;

const contextDefault = {
  mousePosition: { x: 0, y: 0 } as Coord,
  lockPosition: false as boolean,
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

const Robot: React.FC = () => {
  const robotRef = useRef<HTMLDivElement>(null);
  const { mousePosition, lockPosition } = useContext(LoginContext);
  const [lockedPosition, setLockedPosition] = useState<Coord>({ x: 0, y: 0 });

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
    const move = mouseY / 5;
    return move > yLimits.max
      ? yLimits.max
      : move < yLimits.min
      ? yLimits.min
      : move;
  }, [mouseY]);

  const debouncedX = useDebounce(moveX, 100);
  const debouncedY = useDebounce(moveY, 100);

  useEffect(() => {
    if (!lockPosition) return;
    setLockedPosition({ x: debouncedX, y: debouncedY });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lockPosition]);

  const clipPath = useMemo(() => {
    const positionX = lockPosition ? lockedPosition.x : debouncedX;
    const value = baseClip + positionX / 3;
    return `polygon(${value}% 0, 100% 0, 100% 100%, ${value}% 100%)`;
  }, [debouncedX, lockPosition, lockedPosition]);

  const transform = useMemo(() => {
    const x = lockPosition ? lockedPosition.x : debouncedX;
    const y = lockPosition ? lockedPosition.y : debouncedY;
    return `translate(${x}px, ${y}px)`;
  }, [debouncedX, debouncedY, lockPosition, lockedPosition]);

  return (
    <div id={css.robot} ref={robotRef}>
      <div className={css.body}>
        <div className={css.color} style={{ clipPath }} />
        <div className={css.bulb}>
          <div className={css.light}>
            <div className={css.lightBright} />
            <SiWire className={css.wire} />
          </div>
          <div className={css.socket}></div>
        </div>
        <div className={css.face} style={{ transform }}>
          <div className={css.eyesContainer}>
            <div className={`${css.eye} ${css.left}`}>
              <div className={css.eyeBright} />
            </div>
            <div className={`${css.eye} ${css.right}`}>
              <div className={css.eyeBright} />
            </div>
          </div>
          <div className={css.mouth}>
            {Array(Teeth)
              .fill(0)
              .map((_, i) => (
                <div key={i} className={css.tooth} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginRobot: React.FC = () => {
  const [eye, setEye] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<Coord>({ x: 0, y: 0 });
  const [robotPosition, setRobotPosition] = useState<Coord>({ x: 0, y: 0 });
  const [lockPosition, setLockPosition] = useState<boolean>(false);

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
    const {
      x: xRobot,
      y: yRobot,
      width,
      height,
    } = robot.getBoundingClientRect();
    setRobotPosition({ x: xRobot + width / 2, y: yRobot + height / 2 });
  }, []);

  const value = {
    mousePosition,
    lockPosition,
  };

  const onFocus = useCallback(() => setLockPosition(true), []);
  const onBlur = useCallback(() => setLockPosition(false), []);

  return (
    <LoginContext.Provider value={value}>
      <div id={css.loginRobot}>
        <div id={css.robotContainer}>
          <Robot />
        </div>
        <div className={css.input}>
          <input placeholder="User..." onFocus={onFocus} onBlur={onBlur} />
          <div className={css.icon}>
            <FaUserAlt />
          </div>
        </div>
        <div className={css.input}>
          <input placeholder="Password..." type={eye ? "text" : "password"} />
          <div className={`${css.icon} ${css.eye}`}>
            {eye ? (
              <AiFillEyeInvisible onClick={() => setEye(!eye)} />
            ) : (
              <AiFillEye onClick={() => setEye(!eye)} />
            )}
          </div>
        </div>
        <button id={css.submit}>
          <span>Ready</span>
        </button>
      </div>
    </LoginContext.Provider>
  );
};

export default LoginRobot;
