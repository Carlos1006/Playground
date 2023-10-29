import { FC } from "react";
import css from "../styles/inputs.module.scss";

const ButtonStyle = {
  stroke: css.stroke,
  fill: css.fill,
};

interface ButtonProps {
  type?: "stroke" | "fill";
  class_?: string;
  children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({
  type = "stroke",
  class_,
  children,
}: ButtonProps) => {
  return (
    <>
      <div className={`${css.button} ${class_} ${ButtonStyle[type]}`}>
        <span>{children}</span>
      </div>
    </>
  );
};

export default Button;
