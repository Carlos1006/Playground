import { FC } from "react";
import css from "../styles/main.module.scss";
import image from "../assets/cthulhu2.png";

const GreenCthulhu: FC = () => {
  return (
    <div className={css.image02}>
      <img src={image} alt="Cthulhu" />
      <img src={image} alt="Cthulhu" />
    </div>
  );
};

export default GreenCthulhu;
