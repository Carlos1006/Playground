import { FC } from "react";
import css from "../styles/main.module.scss";

const Text: FC = () => {
  return (
    <div className={css.text}>
      <span>
        The Great
        <br />
        Old One
        <br />
        Is
        <br />
        Coming...
        <br />
        &nbsp;
      </span>
    </div>
  );
};

export default Text;
