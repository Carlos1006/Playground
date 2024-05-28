import { FC, memo } from "react";
import bg from "../assets/background.png";
import css from "../styles/main.module.scss";

const Background: FC = () => (
  <div className={css.image}>
    <img className={css.imageSrc} src={bg} alt="background" />
  </div>
);
const BackgroundMemo = memo(Background);

export default BackgroundMemo;
