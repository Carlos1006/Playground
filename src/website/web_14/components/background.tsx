import { FC } from "react";
import mp4 from "../assets/DeloreanHight.mp4";
import css from "../styles/main.module.scss";

export const Background: FC = () => {
  return (
    <div className={css.image}>
      <video className={css.imageSrc} autoPlay loop muted>
        <source src={mp4} type="video/mp4" />
      </video>
    </div>
  );
};

export default Background;
