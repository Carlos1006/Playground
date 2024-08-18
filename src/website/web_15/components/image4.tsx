import { FC } from "react";
import css from "../styles/main.module.scss";
import image from "../assets/cthulhu4.png";

const Image4: FC = () => {
  return (
    <div className={css.image03}>
      <img src={image} alt="Cthulhu" />
      <img src={image} alt="Cthulhu" />
    </div>
  );
};

export default Image4;
