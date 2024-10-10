import { FC } from "react";
import css from "../styles/skills.module.scss";
import SkillIcon from "./SkillIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

import {
  TypescriptIcon,
  JavascriptIcon,
  CSSIcon,
  SassIcon,
  ReactIcon,
  SvelteIcon,
  ArduinoIcon,
  AngularIcon,
  DockerIcon,
  ExpoIcon,
  GitIcon,
  GithubIcon,
  HtmlIcon,
  FigmaIcon,
  JQueryIcon2,
  NestJsIcon,
  MuiIcon,
  MySqlIcon,
  PostgresIcon,
  PostmanIcon,
  ReduxIcon,
  NextJsIcon,
  ViteIcon,
  TailwindIcon,
  ThreeJsIcon,
  ObsidianIcon,
} from "../icons";

const Icons = [
  <TypescriptIcon />,
  <JavascriptIcon />,
  <HtmlIcon />,
  <CSSIcon />,
  <SassIcon />,
  <ReactIcon />,
  <NextJsIcon />,
  <MuiIcon />,
  <ReduxIcon />,
  <TailwindIcon />,
  <SvelteIcon />,
  <AngularIcon />,
  <ThreeJsIcon />,
  <ExpoIcon />,
  <PostmanIcon />,
  <MySqlIcon />,
  <ViteIcon />,
  <PostgresIcon />,
  <NestJsIcon />,
  <DockerIcon />,
  <GitIcon />,
  <GithubIcon />,
  <JQueryIcon2 />,
  <FigmaIcon />,
  <ArduinoIcon />,
  <ObsidianIcon />,
];

const SkillCarousel: FC = () => {
  return (
    <div id={css.skillCarousel}>
      <div className={css.skillCarouselWrapper}>
        <Swiper
          slidesPerView={6}
          spaceBetween={"10cqi"}
          direction="vertical"
          modules={[Mousewheel]}
          mousewheel={{ forceToAxis: true }}
          loop
          className={css.skillCarouselSwiper}
        >
          {Icons.map((icon, index) => (
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
