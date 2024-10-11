import { ReactNode } from "react";
import { SwiperClass } from "swiper/react";

export interface ISkillIcon {
  children: ReactNode;
}

export interface IJonIcon {
  src: string;
}

export interface IJobObject {
  name: string;
  description: ReactNode;
  src: string;
}

export interface ISkillObject {
  name: string;
  description: ReactNode;
  icon: ReactNode;
}

export interface ISwiper {
  onSwiper: (swiper: SwiperClass) => void;
  onSlideChange: (swiper: SwiperClass) => void;
}

export interface ISlider {
  index: number;
}
