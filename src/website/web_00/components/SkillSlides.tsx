import { FC, useEffect, useRef, useState } from "react";
import css from "../styles/skills.module.scss";
import { ISlider } from "../types";
import useSkillData from "../hooks/useSkillData";
import useHomeContext from "../hooks/useHomeContext";

const SkillSlides: FC<ISlider> = ({ index }: ISlider) => {
  const { themeMode } = useHomeContext();
  const [currentIndex, setCurrentIndex] = useState<number>(index);
  const [showNext, setShowNext] = useState<boolean>(false);
  const [atLeastOnce, setAtLeastOnce] = useState<boolean>(false);
  const loaded = useRef<boolean>(false);

  useEffect(() => {
    loaded.current && setShowNext(true);
    const timeout = setTimeout(() => {
      setAtLeastOnce(true);
      setCurrentIndex(index);
      setShowNext(false);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [index]);

  useEffect(() => {
    if (atLeastOnce) {
      loaded.current = true;
    }
  }, [atLeastOnce]);

  const next = useSkillData(index);
  const current = useSkillData(currentIndex);

  return (
    <div id={css.skillSlides} data-mode={themeMode}>
      <h1>Habilidades</h1>
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

export default SkillSlides;
