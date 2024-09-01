import { FC, Fragment } from "react";
import css from "../styles/main.module.scss";
import { MarqueeProps } from "../types";

const Marquee: FC<MarqueeProps> = ({ isMobile }: MarqueeProps) => {
  const count = isMobile ? 3 : 9;
  return (
    <div className={css.marquee}>
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className={css.marqueeWrapper}>
          {Array.from({ length: count }).map((_, index) => (
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
