import { FC } from "react";
import css from "../styles/skills.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

import JobIcon from "./JobIcon";

import milenioSrc from "../assets/milenio.png";
import aldeaSrc from "../assets/aldea.jpg";
import ummSrc from "../assets/umm.webp";
import banregioSrc from "../assets/banregio.png";
import onephaseSrc from "../assets/onephase.jpg";
import masttroSrc from "../assets/masttro.jpg";

const Icons: string[] = [
  masttroSrc,
  onephaseSrc,
  banregioSrc,
  ummSrc,
  aldeaSrc,
  milenioSrc,
];

const JobCarousel: FC = () => {
  return (
    <div id={css.skillCarousel}>
      <div className={css.skillCarouselWrapper}>
        <Swiper
          slidesPerView={2}
          spaceBetween={"10cqi"}
          direction="vertical"
          modules={[Mousewheel]}
          mousewheel={{ forceToAxis: true }}
          loop
          className={css.skillCarouselSwiper}
        >
          {Icons.map((src, index) => (
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
