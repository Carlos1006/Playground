import { FC, memo } from "react";
import bg from "../assets/background.png";
import css from "../styles/main.module.scss";
import { BackgroundProps } from "../types";

const Background: FC<BackgroundProps> = ({ blur = false }: BackgroundProps) => (
  <div className={css.image}>
    <img
      className={`${css.imageSrc} ${blur ? css.blur : ""}`}
      src={bg}
      alt="background"
    />
  </div>
);
const BackgroundMemo = memo(Background);

export default BackgroundMemo;
