import { FC } from "react";
import css from "../styles/skills.module.scss";
import { ISkillIcon } from "../types";

const SkillIcon: FC<ISkillIcon> = ({ children, selected }: ISkillIcon) => {
  return (
    <div
      className={`
        ${css.skillIcon} 
        ${selected ? css.selected : css.notSelected}
      `}
    >
      {children}
    </div>
  );
};

export default SkillIcon;
