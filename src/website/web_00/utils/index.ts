import dayjs, { Dayjs } from "dayjs";
import skillsCss from "../styles/skills.module.scss";
import { RefObject } from "react";

const ICON_WIDTH = Number(skillsCss.IconWidth);

export const getExactAge = (birthDate: Dayjs): number => {
  const now = dayjs();
  const birthDateObj = dayjs(birthDate.toDate());
  const age = now.diff(birthDateObj, "year");
  return age;
};

export const getSlidesPerView = (
  ref: RefObject<HTMLDivElement>,
  defaultSlides: number
): number => {
  if (!ref.current) {
    return defaultSlides;
  }
  const { height, width } = ref.current.getBoundingClientRect();
  const realIconWidth = (width / 100) * ICON_WIDTH;
  const newSlidesPerView = Math.floor((height - realIconWidth) / realIconWidth);
  return newSlidesPerView;
};
