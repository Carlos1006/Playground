import { FC } from "react";
import css from "../styles/skills.module.scss";
import SkillIcon from "./SkillIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay } from "swiper/modules";
import { SKILLS } from "../helpers/SkillIcons";
import {} from "swiper/modules";
import { ISwiper } from "../types";

const SkillCarousel: FC<ISwiper> = ({ onSlideChange, onSwiper }: ISwiper) => {
  return (
    <div id={css.skillCarousel}>
      <div className={css.skillCarouselWrapper}>
        <Swiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          slidesPerView={6}
          spaceBetween={"10cqi"}
          direction="vertical"
          modules={[Autoplay, Mousewheel]}
          mousewheel={{ forceToAxis: true }}
          loop
          className={css.skillCarouselSwiper}
          onSwiper={onSwiper}
          onSlideChange={(swiper): void => {
            onSlideChange(swiper);
          }}
        >
          {SKILLS.map(({ icon }, index) => (
            <SwiperSlide key={index} className={css.skillCarouselSwiperSlide}>
              <SkillIcon>{icon}</SkillIcon>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SkillCarousel;
