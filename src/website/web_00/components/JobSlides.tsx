import { FC } from "react";
import css from "../styles/skills.module.scss";

const JobSlides: FC = () => {
  return (
    <div id={css.skillSlides}>
      <h2>Jobs</h2>
      <div className={css.slidesContainer}></div>
    </div>
  );
};

export default JobSlides;
