import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import css from "../styles/glowButton.module.scss";
import { Color } from "../types";
import { R, G, B } from "../constants";

function useColorGradient(
  color1: Color,
  color2: Color,
  steps = 100
): number[][] {
  const gradient = useMemo(() => {
    const newGradient = [];
    const stepFactor = 1 / (steps - 1);
    for (let i = 0; i < steps; i++) {
      newGradient.push([
        Math.round(color1[R] + stepFactor * i * (color2[R] - color1[R])),
        Math.round(color1[G] + stepFactor * i * (color2[G] - color1[G])),
        Math.round(color1[B] + stepFactor * i * (color2[B] - color1[B])),
      ]);
    }
    return newGradient;
  }, [color1, color2, steps]);
  return gradient;
}

const GlowButton: FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const followingGlow = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [widthPercent, setWidthPercent] = useState(0);
  const gradient = useColorGradient([115, 10, 236], [10, 229, 236], 100);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = (): void => {
    setIsHovering(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovering(false);
  };

  useEffect(() => {
    if (!followingGlow.current) return;

    const updateOffset = (): void => {
      if (!followingGlow.current) return;
      const { width, height } = followingGlow.current.getBoundingClientRect();
      setDimensions({ width, height });
      console.log("offset");
    };
    updateOffset();

    window.addEventListener("resize", updateOffset);
    const resizeObserver = new ResizeObserver(() => {
      updateOffset();
    });
    resizeObserver.observe(followingGlow.current);

    return () => {
      window.removeEventListener("resize", updateOffset);
      resizeObserver.disconnect();
    };
  }, [followingGlow]);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!followingGlow.current) return;
      const { x, y } = followingGlow.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - x,
        y: e.clientY - y,
      });
      const currentWidthPercent = (position.x / dimensions.width) * 100;
      setWidthPercent(parseInt(currentWidthPercent.toString()));
    },
    [position.x, dimensions.width]
  );

  return (
    <>
      <div
        className={css.glowButton}
        ref={followingGlow}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={css.followingGlow}>
          <div
            className={`
                    ${css.glow}
                    ${isHovering ? css.hovering : ""}
                `}
            style={{
              left: `calc(${position.x}px - ${css.glow_side})`,
              top: `calc(${position.y}px - ${css.glow_side})`,
              backgroundColor: `rgb(${gradient[widthPercent][R]}, ${gradient[widthPercent][G]}, ${gradient[widthPercent][B]})`,
            }}
          ></div>
        </div>
        <div className={css.frontFace}></div>
        <div className={css.gradient}></div>
        <div className={`${css.gradient} ${css.glow}`}></div>
        <div className={css.textContainer}>
          <span>Button</span>
        </div>
      </div>
    </>
  );
};

export default GlowButton;
