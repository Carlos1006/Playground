import { FC, useRef, useState } from "react";
import css from "../styles/skills.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay } from "swiper/modules";

import JobIcon from "./JobIcon";
import { JOBS } from "../helpers/JobIcons";
import { ISwiper } from "../types";
import useResizeObserver from "../hooks/useResizeObserver";
import { getSlidesPerView } from "../utils";

const JobCarousel: FC<ISwiper> = ({
  index,
  onSlideChange,
  onSwiper,
}: ISwiper) => {
  const ref = useRef<HTMLDivElement>(null);
  const [slidesPerView, setSlidesPerView] = useState<number>(2);

  useResizeObserver({
    ref,
    onResize: (): void => {
      setSlidesPerView(getSlidesPerView(ref, 2));
    },
  });

  return (
    <div id={css.jobsCarousel} ref={ref}>
      <div className={css.skillCarouselWrapper}>
        <Swiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          onSwiper={onSwiper}
          onSlideChange={(swiper): void => {
            onSlideChange(swiper);
          }}
          slidesPerView={slidesPerView}
          spaceBetween={"10cqi"}
          direction="vertical"
          modules={[Mousewheel, Autoplay]}
          mousewheel={{ forceToAxis: true }}
          loop
          className={css.skillCarouselSwiper}
        >
          {JOBS.map(({ src }, drawIndex) => (
            <SwiperSlide
              key={drawIndex}
              className={css.skillCarouselSwiperSlide}
            >
              <JobIcon selected={drawIndex === index} src={src} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default JobCarousel;
