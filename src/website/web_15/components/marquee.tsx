import { FC, Fragment } from "react";
import css from "../styles/main.module.scss";

const Marquee: FC = () => {
  return (
    <div className={css.marquee}>
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className={css.marqueeWrapper}>
          {Array.from({ length: 9 }).map((_, index) => (
            <Fragment key={index}>
              <div>Cthuhlu</div>
              <div className={css.dot}>•</div>
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Marquee;
