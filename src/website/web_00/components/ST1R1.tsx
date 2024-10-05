import { CSSProperties, FC, useLayoutEffect, useRef, useState } from "react";
import globalCss from "../styles/main.module.scss";
import css from "../styles/st1r1.module.scss";
import Background from "./Background";

const St1r1: FC = () => {
  const maskRef = useRef<HTMLDivElement>(null);
  const leftElementRef = useRef<HTMLDivElement>(null);
  const rightElementRef = useRef<HTMLDivElement>(null);

  const [l0t0Style, setL0t0Style] = useState<CSSProperties>({});
  const [l0b0Style, setL0b0Style] = useState<CSSProperties>({});

  const [maskStyles, setMaskStles] = useState<CSSProperties>({});

  const calculateSizes = (): void => {
    if (maskRef.current) {
      const { left, top } = maskRef.current.getBoundingClientRect();
      setMaskStles({
        left: `-${left}px`,
        top: `-${top}px`,
      });
    }

    if (rightElementRef.current) {
      const { height: heightRight } =
        rightElementRef.current.getBoundingClientRect();

      setL0b0Style({
        height: `calc(${heightRight}px + 1.5cqb + 1px)`,
      });

      if (leftElementRef.current) {
        const { height: heightLeft } =
          leftElementRef.current.getBoundingClientRect();
        setL0t0Style({
          height: `calc(${heightLeft - heightRight}px - 1.5cqb + 1px)`,
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
        data-slot="st1r1-00"
        className={`${globalCss.slot} ${css.leftItem}`}
        ref={leftElementRef}
      >
        <div className={css.wrapper}>
          <div className={css.bordererLeftTop} style={l0t0Style} />
          <div className={css.bordererLeftBottom} style={l0b0Style} />
        </div>
        <div className={css.friendWrapper}>
          <div className={css.mask}>
            <div style={maskStyles} ref={maskRef}>
              <Background />
            </div>
          </div>
        </div>
      </div>
      <div
        data-slot="st1r1-01"
        className={`${globalCss.slot} ${css.rightItem}`}
        ref={rightElementRef}
      >
        <div className={css.wrapper}>
          <div className={css.bordererRight} />
        </div>
      </div>
    </>
  );
};

export default St1r1;
