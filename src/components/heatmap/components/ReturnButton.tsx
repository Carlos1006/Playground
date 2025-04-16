import { FC } from "react";
import css from "../styles/heatmap.module.scss";
import { IReturnButton } from "../types";

const ReturnButton: FC<IReturnButton> = ({ onClick }: IReturnButton) => {
  return (
    <div className={css.returnButton} onClick={onClick}>
      <svg viewBox="0 0 24 24">
        <path
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 5v14m7-7l-7-7l-7 7"
        ></path>
      </svg>
    </div>
  );
};

export default ReturnButton;
