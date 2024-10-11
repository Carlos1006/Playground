import { FC } from "react";
import css from "../styles/skills.module.scss";
import { IJonIcon } from "../types";

const JobIcon: FC<IJonIcon> = ({ src, selected }: IJonIcon) => {
  return (
    <div
      className={`
        ${css.skillIcon} 
        ${selected ? css.selected : css.notSelected}
      `}
    >
      <img src={src} alt="Job Icon" />
    </div>
  );
};

export default JobIcon;
