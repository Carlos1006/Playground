import { FC, useEffect, useState } from "react";
import css from "../styles/skills.module.scss";
import { JOBS } from "../helpers/JobIcons";

import "swiper/css";
import "swiper/css/navigation";
import { ISlider } from "../types";

const JobSlides: FC<ISlider> = ({ index }: ISlider) => {
  const [currentIndex, setCurrentIndex] = useState<number>(index);
  const [showNext, setShowNext] = useState<boolean>(false);

  useEffect(() => {
    setShowNext(true);
    const timeout = setTimeout(() => {
      setCurrentIndex(index);
      setShowNext(false);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [index]);

  const next = JOBS[index];
  const current = JOBS[currentIndex];

  return (
    <div id={css.skillSlides}>
      <h1>Jobs</h1>
      <div className={css.slidesContainer}>
        <div className={css.slidesWrapper}>
          <div
            className={`${css.skillCarouselSlide} ${
              showNext ? css.vanish : ""
            }`}
          >
            <h2>{current.name}</h2>
            <p>{current.description}</p>
          </div>
          <div
            className={`${css.skillCarouselSlide} ${css.next} ${
              showNext ? css.show : ""
            }`}
          >
            <h2>{next.name}</h2>
            <p>{next.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSlides;
