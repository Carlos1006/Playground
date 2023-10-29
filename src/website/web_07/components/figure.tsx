import { FC } from "react";
import { IFigure } from "../types";
import css from "../styles/main.module.scss";

const Figure: FC<IFigure> = ({
  fix,
  translateX,
  translateY,
  left,
  top,
  type,
}: IFigure) => {
  return (
    <div
      style={{
        top: top,
        left: left,
        transform: `translateX(${translateX / fix[0]}px) translateY(${
          translateY / fix[1]
        }px)`,
      }}
      className={css.figure}
    >
      <div className={css[type]} />
    </div>
  );
};

export default Figure;
