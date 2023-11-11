import { FC, useMemo } from "react";
import css from "../styles/bubble.module.scss";

interface BubbleProps {
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

  return (
    <>
      <div
        className={css.bubble}
        style={{
          width: side,
          height: side,
          left: x,
          top: y,
        }}
      >
        <div
          className={css.innerBubble}
          style={{
            boxShadow: boxShadowInset,
            background,
          }}
        ></div>
        <div
          className={css.outerBubble}
          style={{
            background,
            width: outerSide,
            height: outerSide,
          }}
        ></div>
      </div>
    </>
  );
};

export default Bubble;
