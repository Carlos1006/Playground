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
const ArmLines = 10;
const xLimits: Limit = { min: -25, max: 3 };
const yLimits: Limit = { min: -10, max: 8 };
const baseClip = 90;

const contextDefault = {
  mousePosition: { x: 0, y: 0 } as Coord,
  lockPosition: false as boolean,
  focusPassword: false as boolean,
  hoverPassword: false as boolean,
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
  const { mousePosition, focusPassword, hoverPassword } =
    useContext(LoginContext);

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

  const debouncedX = useDebounce(moveX, 100);
  const debouncedY = useDebounce(moveY, 100);

  const clipPath = useMemo(() => {
    const value = baseClip + debouncedX / 3;
    return `polygon(${value}% 0, 100% 0, 100% 100%, ${value}% 100%)`;
  }, [debouncedX]);

  const transform = useMemo(() => {
    return `translate(${debouncedX}px, ${debouncedY}px)`;
  }, [debouncedX, debouncedY]);

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
              <div
                className={`${css.hand} ${
                  focusPassword || hoverPassword ? css.show : ""
                } ${css.leftHand}`}
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
            </div>
            <div className={`${css.eye}  ${css.right}`}>
              <div className={css.eyeBright} />
              <div
                className={`${css.hand} ${
                  focusPassword || hoverPassword ? css.show : ""
                } ${css.rightHand}`}
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
  const [lockedPosition, setLockedPosition] = useState<Coord>({ x: 0, y: 0 });
  const [lockPosition, setLockPosition] = useState<boolean>(false);
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [focusPassword, setFocusPassword] = useState<boolean>(false);
  const [hoverPassword, setHoverPassword] = useState<boolean>(false);

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

  const onUserBlur = useCallback(() => {
    setLockPosition(false);
  }, []);

  const onPasswordBlur = useCallback(() => {
    setLockPosition(false);
    setFocusPassword(false);
  }, []);

  const onPasswordMouseEnter = useCallback(() => {
    setHoverPassword(true);
  }, []);

  const onPasswordMouseLeave = useCallback(() => {
    setHoverPassword(false);
  }, []);

  const value = {
    mousePosition: lockPosition ? lockedPosition : mousePosition,
    lockPosition,
    focusPassword,
    hoverPassword,
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
        <button id={css.submit}>
          <span>Ready</span>
        </button>
      </div>
    </LoginContext.Provider>
  );
};

export default LoginRobot;
