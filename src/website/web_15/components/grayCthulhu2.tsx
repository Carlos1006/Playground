import { forwardRef } from "react";
import css from "../styles/main.module.scss";
import image from "../assets/cthulhu3.png";
import { GrayCthulhu2Props } from "../types";

const GrayCthulhu2 = forwardRef<HTMLDivElement, GrayCthulhu2Props>(
  ({ squareSide, left, width }, ref) => {
    return (
      <div
        ref={ref}
        className={css.fixedSquare}
        style={{
          width: squareSide,
          height: squareSide,
        }}
      >
        <div
          className={css.fullImage}
          style={{
            left,
            width,
          }}
        >
          <div />
          <img src={image} alt="Cthulhu" />
          <img src={image} alt="Cthulhu" />
        </div>
      </div>
    );
  }
);

export default GrayCthulhu2;
