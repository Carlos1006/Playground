import { FC, useEffect, useRef, useState } from "react";
import css from "../styles/robotDev.module.scss";

interface RobotDevProps {
  size: string;
  coords?: [string, string];
}

const RobotDev: FC<RobotDevProps> = ({
  size,
  coords = ["0", "0"],
}: RobotDevProps) => {
  const teeth: JSX.Element[] = [];
  const bodyRef = useRef<HTMLDivElement>(null);
  const [activeTooth, setActiveTooth] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [once, setOnce] = useState(true);
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    if (bodyRef.current === null) return;
    const { clientWidth, clientHeight } = bodyRef.current;
    const [w, h] = [clientWidth / 20, clientHeight / 20];
    const styles = `
            :root {
                --len:${clientWidth / 5}px;
                --len2:${clientWidth / 7.5}px;
            }
        `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (activeTooth < 5) {
        setActiveTooth(activeTooth + 1);
      } else {
        setActiveTooth(0);
      }
    }, 200);
  }, [teeth]);
  useEffect(() => {
    if (isActive && once) {
      setOnce(false);
    }
    if (!isActive && !once) {
      setRotate(true);
    }
  }, [isActive]);
  useEffect(() => {
    if (rotate) {
      setTimeout(() => {
        setRotate(false);
      }, 1000);
    }
  }, [rotate]);

  for (let i = 0; i < 5; i++) {
    teeth.push(
      <div
        className={`${css.tooth} ${activeTooth === i ? css.active : ""}`}
        key={i}
      ></div>
    );
  }

  return (
    <div
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      className={css.robot}
      style={{
        width: size,
        height: size,
        left: coords[0],
        top: coords[1],
      }}
      id={css.robot_0}
    >
      <div className={css.shadow} />
      <div ref={bodyRef} className={css.body}>
        <div className={css.bulb}>
          <div className={isHover ? css.light : ""}></div>
          <div></div>
        </div>
        <div className={`${css.face} ${isActive ? css.eyesLight : ""}`}>
          <div className={`${css.eye} ${css.left}`} />
          <div className={`${css.eye} ${css.right}`} />
          <div className={css.mouth}>{teeth}</div>
        </div>
        <div className={css.arm}>
          <div className={`${css.claw} ${rotate ? css.rotate : ""}`}>
            <div />
            <div />
            <div />
          </div>
          <div className={css.forearm} />
          <div className={css.upperarm} />
        </div>
        <div className={`${css.arm} ${css.rightArm}`}>
          <div className={`${css.claw} ${rotate ? css.rotate : ""}`}>
            <div />
            <div />
            <div />
          </div>
          <div className={css.forearm} />
          <div className={css.upperarm} />
        </div>
      </div>
      <div className={css.leg} />
      <div className={`${css.leg} ${css.rightLeg}`} />
    </div>
  );
};

export default RobotDev;
