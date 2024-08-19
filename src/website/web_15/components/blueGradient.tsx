import { FC } from "react";
import { BlueGradientProps } from "../types";
import css from "../styles/main.module.scss";

const BlueGradient: FC<BlueGradientProps> = ({
  height,
  width,
}: BlueGradientProps) => {
  return (
    <div
      style={{ width, height }}
      className={`${css.image00} ${css.gradient}`}
    />
  );
};

export default BlueGradient;
