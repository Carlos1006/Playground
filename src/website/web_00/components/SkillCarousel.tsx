import { FC, useRef, useState } from "react";
import css from "../styles/skills.module.scss";
import SkillIcon from "./SkillIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay } from "swiper/modules";
import { SKILLS } from "../helpers/SkillIcons";
import {} from "swiper/modules";
import { ISwiper } from "../types";
import useResizeObserver from "../hooks/useResizeObserver";
import { getSlidesPerView } from "../utils";

const SkillCarousel: FC<ISwiper> = ({
  index,
  onSlideChange,
  onSwiper,
}: ISwiper) => {
  const ref = useRef<HTMLDivElement>(null);
  const [slidesPerView, setSlidesPerView] = useState<number>(5);

  useResizeObserver({
    ref,
    onResize: (): void => {
      setSlidesPerView(getSlidesPerView(ref, 5));
    },
  });

  return (
    <div id={css.skillCarousel} ref={ref}>
      <div className={css.skillCarouselWrapper}>
        <Swiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          slidesPerView={slidesPerView}
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
          {SKILLS.map(({ icon: Icon }, drawIndex) => (
            <SwiperSlide
              key={drawIndex}
              className={css.skillCarouselSwiperSlide}
            >
              <SkillIcon selected={drawIndex === index}>
                <Icon />
              </SkillIcon>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SkillCarousel;
