import { FC } from "react";
import css from "../styles/skills.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay } from "swiper/modules";

import JobIcon from "./JobIcon";
import { JOBS } from "../helpers/JobIcons";
import { ISwiper } from "../types";

const JobCarousel: FC<ISwiper> = ({ onSlideChange, onSwiper }: ISwiper) => {
  return (
    <div id={css.skillCarousel}>
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
          {JOBS.map(({ src }, index) => (
            <SwiperSlide key={index} className={css.skillCarouselSwiperSlide}>
              <JobIcon src={src} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default JobCarousel;
