import { FC, useEffect, useMemo, useState } from "react";
import css from "../styles/bubble.module.scss";

export interface BubbleProps {
  side: string;
  x: string | number;
  y: string | number;
  color: {
    glow: [number, number, number];
    innerColor: [number, number, number];
    outerColor: [number, number, number];
  };
  center: [number, number];
}

const Bubble: FC<BubbleProps> = ({
  x,
  y,
  side,
  color,
  center,
}: BubbleProps) => {
  const { glow, innerColor, outerColor } = color;
  const [active, setActive] = useState<boolean>(false);

  const { initialRadius, initialX, initialY } = useMemo(() => {
    const radius = `calc(${side} / 2)`;
    return {
      initialRadius: radius,
      initialX: `calc(${x} + ${radius})`,
      initialY: `calc(${y} + ${radius})`,
    };
  }, [side, x, y]);

  const boxShadowInset = useMemo(() => {
    const [R, G, B] = glow;
    return `inset 0 -5px 5px 3px rgba(255,255,255,0.4), inset 0 5px 5px 3px rgba(${R},${G},${B},0.8)`;
  }, [glow]);

  const background = useMemo(() => {
    const [R1, G1, B1] = innerColor;
    const [R2, G2, B2] = outerColor;
    const [X, Y] = center;
    return `radial-gradient(circle at ${X}% ${Y}%, rgba(${R1},${G1},${B1},0.2) 0%, rgba(${R2},${G2},${B2},0.7) 100%)`;
  }, [innerColor, outerColor, center]);

  const outerSide = useMemo(() => {
    return `calc(${side} + 2vw)`;
  }, [side]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActive(true);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <div
        className={css.bubble}
        style={{
          width: active ? side : 0,
          height: active ? side : 0,
          left: active ? x : initialX,
          top: active ? y : initialY,
        }}
      >
        <div
          className={css.innerBubble}
          style={{
            boxShadow: boxShadowInset,
            background,
            left: active ? 0 : initialRadius,
            top: active ? 0 : initialRadius,
          }}
        ></div>
        <div
          className={css.outerBubble}
          style={{
            background,
            width: active ? outerSide : 0,
            height: active ? outerSide : 0,
          }}
        ></div>
      </div>
    </>
  );
};

export default Bubble;
