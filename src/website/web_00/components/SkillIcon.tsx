import { FC } from "react";
import css from "../styles/skills.module.scss";
import { ISkillIcon } from "../types";

const SkillIcon: FC<ISkillIcon> = ({ children }: ISkillIcon) => {
  return <div className={css.skillIcon}>{children}</div>;
};

export default SkillIcon;
