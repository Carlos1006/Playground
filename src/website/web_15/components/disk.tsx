import { FC } from "react";
import css from "../styles/main.module.scss";

const Disk: FC = () => {
  return (
    <div className={css.disk}>
      <div className={css.diskInner}></div>
      <div className={css.diskFront}>
        <span>
          Lorem ipsum dolor <b>sit amet</b>
          <br />
          consectetur adipiscing elit.
        </span>
      </div>
    </div>
  );
};

export default Disk;
