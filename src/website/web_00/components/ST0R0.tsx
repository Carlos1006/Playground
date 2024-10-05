import { CSSProperties, FC, useLayoutEffect, useRef, useState } from "react";
import globalCss from "../styles/main.module.scss";
import css from "../styles/st0r0.module.scss";
import Background from "./Background";

const St0r0: FC = () => {
  const maskRef = useRef<HTMLDivElement>(null);
  const leftElementRef = useRef<HTMLDivElement>(null);
  const rightElementRef = useRef<HTMLDivElement>(null);

  const [maskStyles, setMaskStles] = useState<CSSProperties>({});
  const [r0t0Style, setR0t0Style] = useState<CSSProperties>({});
  const [r0b0Style, setR0b0Style] = useState<CSSProperties>({});

  const calculateSizes = (): void => {
    if (maskRef.current) {
      const { left, top } = maskRef.current.getBoundingClientRect();
      setMaskStles({
        left: `-${left}px`,
        top: `-${top}px`,
      });
    }
    if (leftElementRef.current) {
      const { height: heightLeft } =
        leftElementRef.current.getBoundingClientRect();
      setR0t0Style({
        height: `calc(${heightLeft}px + 1.5cqb + 1px)`,
      });
      if (rightElementRef.current && leftElementRef.current) {
        const { height: heightRight } =
          rightElementRef.current.getBoundingClientRect();
        setR0b0Style({
          height: `calc(${heightRight - heightLeft}px - 1.5cqb + 1px)`,
        });
      }
    }
  };

  useLayoutEffect(() => {
    document.addEventListener("DOMContentLoaded", calculateSizes);
    window.addEventListener("resize", calculateSizes);
    calculateSizes();
    return () => {
      document.removeEventListener("DOMContentLoaded", calculateSizes);
      window.removeEventListener("resize", calculateSizes);
    };
  }, []);

  return (
    <>
      <div
        data-slot="st0r0-00"
        className={`${globalCss.slot} ${css.leftItem}`}
        ref={leftElementRef}
      >
        <div className={css.wrapper}>
          <div className={css.bordererLeft} />
        </div>
      </div>
      <div
        data-slot="st0r0-01"
        className={`${globalCss.slot} ${css.rightItem}`}
        ref={rightElementRef}
      >
        <div className={css.wrapper}>
          <div className={css.bordererRightTop} style={r0t0Style} />
          <div className={css.bordererRightBottom} style={r0b0Style} />
        </div>
        <div className={css.friendWrapper}>
          <div className={css.mask}>
            <div style={maskStyles} ref={maskRef}>
              <Background />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default St0r0;
