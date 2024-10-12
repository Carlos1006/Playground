import { FC } from "react";
import css from "../styles/name.module.scss";

const Name: FC = () => {
  return (
    <div id={css.name}>
      <span>Hi!, I am</span>
      <span>Carlos Daniel Gonzalez</span>
      <div id={css.line} />
      <span>Senior Software Developer</span>
    </div>
  );
};

export default Name;
