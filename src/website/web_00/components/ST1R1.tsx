import {
  CSSProperties,
  FC,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import globalCss from "../styles/main.module.scss";
import css from "../styles/st1r1.module.scss";
import Background from "./Background";
import JobSlides from "./JobSlides";
import JobCarousel from "./JobCarousel";
import { SwiperClass } from "swiper/react";
import JobTime from "./JobTime";
import useHomeContext from "../hooks/useHomeContext";

const St1r1: FC = () => {
  const { themeMode } = useHomeContext();

  const maskRef = useRef<HTMLDivElement>(null);
  const leftElementRef = useRef<HTMLDivElement>(null);
  const rightElementRef = useRef<HTMLDivElement>(null);
  const jobCarousel = useRef<SwiperClass | null>(null);

  const [l0t0Style, setL0t0Style] = useState<CSSProperties>({});
  const [l0b0Style, setL0b0Style] = useState<CSSProperties>({});
  const [maskStyles, setMaskStyles] = useState<CSSProperties>({});
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

    if (rightElementRef.current) {
      const { height: heightRight } =
        rightElementRef.current.getBoundingClientRect();

      setL0b0Style({
        height: `calc(${heightRight}px + 1.5vmin + 1px)`,
      });

      if (leftElementRef.current) {
        const { height: heightLeft } =
          leftElementRef.current.getBoundingClientRect();
        setL0t0Style({
          height: `calc(${heightLeft - heightRight}px - 1.5vmin + 1px)`,
        });
      }
    }
  };

  const onCarouselSwiper = (swiper: SwiperClass): void => {
    jobCarousel.current = swiper;
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
        data-slot="st1r1-00"
        className={`${globalCss.slot} ${css.leftItem}`}
        ref={leftElementRef}
        data-mode={themeMode}
      >
        <JobTime index={debounceIndex} />
        <JobSlides index={debounceIndex} />
        <div className={css.wrapper}>
          <div
            className={css.bordererLeftTop}
            style={l0t0Style}
            data-mode={themeMode}
          />
          <div
            className={css.bordererLeftBottom}
            style={l0b0Style}
            data-mode={themeMode}
          />
        </div>
        <div className={css.friendWrapper} data-mode={themeMode}>
          <div className={css.mask} data-mode={themeMode}>
            <div style={maskStyles} ref={maskRef}>
              <Background />
            </div>
          </div>
        </div>
      </div>
      <div
        data-mode={themeMode}
        data-slot="st1r1-01"
        className={`${globalCss.slot} ${css.rightItem}`}
        ref={rightElementRef}
      >
        <JobCarousel
          index={activeIndex}
          onSlideChange={onCarouselChange}
          onSwiper={onCarouselSwiper}
        />
        <div className={css.wrapper} data-mode={themeMode}>
          <div className={css.bordererRight} data-mode={themeMode} />
        </div>
      </div>
    </>
  );
};

export default St1r1;
