import { forwardRef } from "react";
import css from "../styles/main.module.scss";
import image from "../assets/cthulhu3.png";

interface GrayCthulhu2Props {
  squareSide: number;
  left: number;
  width: number;
}

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
