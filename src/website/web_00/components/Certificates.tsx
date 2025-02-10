import { FC } from "react";
import css from "../styles/certificates.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Certify from "./Certifiy";
import { CERTIFICATES } from "../helpers/certificates";
import useHomeContext from "../hooks/useHomeContext";
import { MODE } from "../constants";
import CertificatesOld from "./CertificatesOld";
import { useTranslation } from "react-i18next";

const Certificates: FC = () => {
  const { t } = useTranslation();
  const { themeMode } = useHomeContext();

  if (themeMode === MODE.OLD) {
    return <CertificatesOld />;
  }

  return (
    <div id={css.certificates} data-mode={themeMode}>
      <h1>{t("certificates")}</h1>
      <div id={css.certificatesWrapper}>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          className={css.mySwiper}
        >
          {CERTIFICATES.map((certify, index) => (
            <SwiperSlide className={css.slide} key={index}>
              <Certify {...certify} key={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Certificates;
