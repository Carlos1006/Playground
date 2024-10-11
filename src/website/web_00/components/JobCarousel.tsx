import { FC } from "react";
import css from "../styles/skills.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay } from "swiper/modules";

import JobIcon from "./JobIcon";
import { JOBS } from "../helpers/JobIcons";
import { ISwiper } from "../types";

const JobCarousel: FC<ISwiper> = ({
  index,
  onSlideChange,
  onSwiper,
}: ISwiper) => {
  return (
    <div id={css.jobsCarousel}>
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
          slidesPerView={2}
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
