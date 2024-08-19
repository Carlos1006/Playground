import { FC } from "react";
import css from "../styles/main.module.scss";
import { ArrowRightProps } from "../types";

const ArrowRight: FC<ArrowRightProps> = ({ width }: ArrowRightProps) => {
  return <div style={{ width }} className={css.arrowRight}></div>;
};

export default ArrowRight;
