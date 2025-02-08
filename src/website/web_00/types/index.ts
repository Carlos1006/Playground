import {
  Dispatch,
  FC,
  LegacyRef,
  ReactNode,
  RefObject,
  SetStateAction,
} from "react";
import { SwiperClass } from "swiper/react";

export interface IHomeContext {
  themeMode: ThemeMode;
  setThemeMode: Dispatch<SetStateAction<ThemeMode>>;
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}

export interface ISkillIcon {
  children: ReactNode;
  selected: boolean;
}

export interface ISocialIcon {
  children: ReactNode;
  title: string;
}

export interface IJonIcon {
  src: string;
  selected: boolean;
}

export interface IJobObject {
  name: string;
  description: FC;
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

export interface ILoader {
  className: string;
}

export interface IUserResizeObserverParams {
  ref: RefObject<HTMLElement>;
  onResize: ResizeObserverCallback;
}

export interface IIf {
  condition: boolean;
  children: ReactNode;
}

export interface IDivIf {
  condition: boolean;
  children: ReactNode;
  id?: string | null;
  className?: string;
  themeMode?: ThemeMode | null;
}

export interface ITldr {
  onClick: () => void;
  active: boolean;
}

export type ThemeMode = "light" | "dark" | "old";

export type Language = "en" | "es";

export interface ICertify {
  name: string;
  duration: string;
  year: string;
  institution: string;
}

export interface IShowCaseControl {
  title: string;
}

export interface IMenuItem {
  title: string;
  src?: string;
  element?: ReactNode;
  className?: string;
  onClick: () => void;
}

export interface IMenu {
  x: number;
  y: number;
  open: boolean;
  items: IMenuItem[];
}

export type Position = {
  x: number;
  y: number;
};

export interface IUsePosition<Element> {
  ref: LegacyRef<Element> | undefined;
  position: Position;
}

export interface IShowCaseComponent {
  component: FC;
  title: string;
  props: Record<string, unknown>;
}

export type ShowCaseComponent =
  | "DayNightToggle"
  | "GlowButton"
  | "DeleteFile"
  | "CompleteOrder"
  | "CompleteOrderWithError"
  | "SubscribeButton"
  | "AudioSphere"
  | "AudioFrequecies"
  | "LoginRobot"
  | "Rocket"
  | "Page_16"
  | "Page_15"
  | "Page_08"
  | "Grid"
  | "Terrain"
  | "Globe"
  | "GlobeMono"
  | "Pixel";

export interface IShowCaseComponents {
  [key: string]: IShowCaseComponent;
}
