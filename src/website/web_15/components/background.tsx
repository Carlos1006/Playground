import { FC } from "react";
import css from "../styles/main.module.scss";
import image from "../assets/tentacles_transparent.png";

const Background: FC = () => {
  return (
    <div className={css.background}>
      <img src={image} alt="Cthulhu" />
    </div>
  );
};

export default Background;
