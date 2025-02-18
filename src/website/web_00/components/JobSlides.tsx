import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import css from "../styles/skills.module.scss";
import { ISlider } from "../types";
import useJobData from "../hooks/useJobData";
import useHomeContext from "../hooks/useHomeContext";

const JobSlides: FC<ISlider> = ({ index }: ISlider) => {
  const { t } = useTranslation();
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

  const next = useJobData(index);
  const current = useJobData(currentIndex);
  const { description: Description } = current;
  const { description: NextDescription } = next;

  return (
    <div id={css.jobsSlides} data-mode={themeMode}>
      <h1>{t("job_history")}</h1>
      <div className={css.slidesContainer}>
        <div className={css.slidesWrapper}>
          <div
            className={`${css.skillCarouselSlide} ${css.jobCarouselSlide} ${
              showNext ? css.vanish : ""
            }`}
          >
            <h2>{current.name}</h2>
            <Description />
          </div>
          <div
            className={`${css.skillCarouselSlide} ${css.jobCarouselSlide} ${
              css.next
            } ${showNext ? css.show : ""}`}
          >
            <h2>{next.name}</h2>
            <NextDescription />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSlides;
