import { FC } from "react";
import { ImageProps } from "../types";
import css from "../styles/main.module.scss";
import image from "../assets/cthulhu.png";

const Image: FC<ImageProps> = ({ height, width }: ImageProps) => {
  return (
    <div style={{ width, height }} className={css.image00}>
      <img src={image} alt="Cthulhu" />
      <img src={image} alt="Cthulhu" />
    </div>
  );
};

export default Image;
