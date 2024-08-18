import { FC } from "react";
import css from "../styles/main.module.scss";
import image from "../assets/cthulhu3.png";

const Image2: FC = () => {
  return (
    <div className={css.image01}>
      <div />
      <img src={image} alt="Cthulhu" />
      <img src={image} alt="Cthulhu" />
    </div>
  );
};

export default Image2;
