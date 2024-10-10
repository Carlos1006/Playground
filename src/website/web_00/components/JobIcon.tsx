import { FC } from "react";
import css from "../styles/skills.module.scss";
import { IJonIcon } from "../types";

const JobIcon: FC<IJonIcon> = ({ src }: IJonIcon) => {
  return (
    <div className={css.skillIcon}>
      <img src={src} alt="Job Icon" />
    </div>
  );
};

export default JobIcon;
