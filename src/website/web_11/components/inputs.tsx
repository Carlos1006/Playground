import css from "../styles/Inputs.module.scss";
import { IButton } from "../types";
import { FC } from "react";

export const Button: FC<IButton> = ({ extra, icon, title }: IButton) => {
  return (
    <>
      <button className={`${css.button} ${extra}`} type="button">
        <div>{icon}</div>
        <span>{title}</span>
      </button>
    </>
  );
};
