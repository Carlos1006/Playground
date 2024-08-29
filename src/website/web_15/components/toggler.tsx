import { FC } from "react";
import { TogglerProps } from "../types";
import css from "../styles/main.module.scss";

const Toggler: FC<TogglerProps> = ({ onClick, isOn = false }: TogglerProps) => {
  return (
    <div className={`${css.toggler} ${isOn ? css.isOn : ""}`} onClick={onClick}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default Toggler;
