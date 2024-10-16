import { FC } from "react";
import css from "../styles/certificates.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Certify from "./Certifiy";

const Certificates: FC = () => {
  return (
    <div id={css.certificates}>
      <h1>Certificates</h1>
      <div id={css.certificatesWrapper}>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          loop
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className={css.mySwiper}
        >
          <SwiperSlide className={css.slide}>
            <Certify />
          </SwiperSlide>
          <SwiperSlide className={css.slide}>
            <Certify />
          </SwiperSlide>
          <SwiperSlide className={css.slide}>
            <Certify />
          </SwiperSlide>
          <SwiperSlide className={css.slide}>
            <Certify />
          </SwiperSlide>
          <SwiperSlide className={css.slide}>
            <Certify />
          </SwiperSlide>
          <SwiperSlide className={css.slide}>
            <Certify />
          </SwiperSlide>
          <SwiperSlide className={css.slide}>
            <Certify />
          </SwiperSlide>
          <SwiperSlide className={css.slide}>
            <Certify />
          </SwiperSlide>
          <SwiperSlide className={css.slide}>
            <Certify />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Certificates;
