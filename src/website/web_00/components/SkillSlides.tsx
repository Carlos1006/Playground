import { FC } from "react";
import css from "../styles/skills.module.scss";

const SkillSlides: FC = () => {
  return (
    <div id={css.skillSlides}>
      <h2>Skills</h2>
      <div className={css.slidesContainer}></div>
    </div>
  );
};

export default SkillSlides;
