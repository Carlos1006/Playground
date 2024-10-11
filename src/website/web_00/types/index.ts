import { FC, ReactNode } from "react";
import { SwiperClass } from "swiper/react";

export interface ISkillIcon {
  children: ReactNode;
  selected: boolean;
}

export interface IJonIcon {
  src: string;
  selected: boolean;
}

export interface IJobObject {
  name: string;
  description: ReactNode;
  src: string;
  from: string;
  to: string;
}

export interface ISkillObject {
  name: string;
  description: ReactNode;
  icon: FC;
  level: number;
  color: string;
}

export interface ISwiper {
  index: number;
  onSwiper: (swiper: SwiperClass) => void;
  onSlideChange: (swiper: SwiperClass) => void;
}

export interface ISlider {
  index: number;
}

export interface ISkillBar {
  index: number;
}

export interface IJobDates {
  index: number;
}

export interface IGlitchText {
  text: string;
  searchTime?: number;
  stop?: number;
  letter?: number;
  initialDelay?: number;
}

export interface IGlitchCharacter {
  text: string;
  delay: number;
  searchTime: number;
  stop: number;
}
