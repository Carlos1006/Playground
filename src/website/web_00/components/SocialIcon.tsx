import { FC } from "react";
import css from "../styles/socialMedia.module.scss";
import { ISocialIcon } from "../types";

const SocialIcon: FC<ISocialIcon> = ({ children, title }: ISocialIcon) => {
  return (
    <div className={css.socialIcon} title={title}>
      {children}
    </div>
  );
};

export default SocialIcon;
