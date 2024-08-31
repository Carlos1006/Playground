import { FC } from "react";
import { PinkCthulhuProps } from "../types";
import css from "../styles/main.module.scss";
import image from "../assets/cthulhu.png";

const PinkCthulhu: FC<PinkCthulhuProps> = ({
  height,
  width,
  imgWidth,
  imgLeft,
  imgBottom,
}: PinkCthulhuProps) => {
  return (
    <div style={{ width, height }} className={css.image00}>
      <img
        style={{ width: imgWidth, left: imgLeft, bottom: imgBottom }}
        src={image}
        alt="Cthulhu"
      />
      <img
        style={{ width: imgWidth, left: imgLeft, bottom: imgBottom }}
        src={image}
        alt="Cthulhu"
      />
    </div>
  );
};

export default PinkCthulhu;
