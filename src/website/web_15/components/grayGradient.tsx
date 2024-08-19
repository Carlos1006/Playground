import { FC } from "react";
import css from "../styles/main.module.scss";
import { GrayGradientProps } from "../types";

const GrayGradient: FC<GrayGradientProps> = ({
  height,
  top = 0,
  width,
  right,
}: GrayGradientProps) => {
  const style = {
    width: width,
    height: height,
    top: top,
    ...(right ? { right: right } : {}),
  };

  return <div style={style} className={css.image04} />;
};

export default GrayGradient;
