import {
  CSSProperties,
  FC,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import globalCss from "../styles/main.module.scss";
import css from "../styles/st0r0.module.scss";
import Background from "./Background";
import SkillCarousel from "./SkillCarousel";
import SkillSlides from "./SkillSlides";
import { SwiperClass } from "swiper/react";
import SkillBar from "./SkillBar";
import useHomeContext from "../hooks/useHomeContext";

const St0r0: FC = () => {
  const { themeMode } = useHomeContext();

  const maskRef = useRef<HTMLDivElement>(null);
  const leftElementRef = useRef<HTMLDivElement>(null);
  const rightElementRef = useRef<HTMLDivElement>(null);
  const skillCarousel = useRef<SwiperClass | null>(null);

  const [maskStyles, setMaskStyles] = useState<CSSProperties>({});
  const [r0t0Style, setR0t0Style] = useState<CSSProperties>({});
  const [r0b0Style, setR0b0Style] = useState<CSSProperties>({});
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [debounceIndex, setDebounceIndex] = useState<number>(0);

  const calculateSizes = (): void => {
    if (maskRef.current) {
      const { left, top } = maskRef.current.getBoundingClientRect();
      setMaskStyles({
        left: `-${left}px`,
        top: `-${top}px`,
      });
    }
    if (leftElementRef.current) {
      const { height: heightLeft } =
        leftElementRef.current.getBoundingClientRect();
      setR0t0Style({
        height: `calc(${heightLeft}px + 1.5vmin + 1px)`,
      });
      if (rightElementRef.current && leftElementRef.current) {
        const { height: heightRight } =
          rightElementRef.current.getBoundingClientRect();
        setR0b0Style({
          height: `calc(${heightRight - heightLeft}px - 1.5vmin + 1px)`,
        });
      }
    }
  };

  const onCarouselSwiper = (swiper: SwiperClass): void => {
    skillCarousel.current = swiper;
  };

  const onCarouselChange = (swiper: SwiperClass): void => {
    setActiveIndex(swiper.realIndex);
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceIndex(activeIndex);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [debounceIndex, activeIndex]);

  return (
    <>
      <div
        data-slot="st0r0-00"
        data-mode={themeMode}
        className={`${globalCss.slot} ${css.leftItem}`}
        ref={leftElementRef}
      >
        <SkillSlides index={debounceIndex} />
        <SkillBar index={debounceIndex} />
        <div className={css.wrapper}>
          <div className={css.bordererLeft} />
        </div>
      </div>
      <div
        data-slot="st0r0-01"
        data-mode={themeMode}
        className={`${globalCss.slot} ${css.rightItem}`}
        ref={rightElementRef}
      >
        <SkillCarousel
          index={activeIndex}
          onSlideChange={onCarouselChange}
          onSwiper={onCarouselSwiper}
        />
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
