import { FC } from "react";
import css from "../styles/showCase.module.scss";
import PlayIcon from "../icons/PlayIcon";
import PauseIcon from "../icons/PauseIcon";
import StopIcon from "../icons/StopIcon";
import BackwardIcon from "../icons/PreviewIcon";
import FastBackwardIcon from "../icons/FastBackwardIcon";
import FastForwardIcon from "../icons/FastForwardIcon";
import ForwardIcon from "../icons/NextIcon";
import { IShowCaseControl } from "../types";

const ShowCaseControl: FC<IShowCaseControl> = ({ title }: IShowCaseControl) => {
  return (
    <div id={css.showCaseControl}>
      <input type="range" className={css.range} value={20} />
      <div className={css.controls}>
        <div className={css.iconButton}>
          <PlayIcon />
        </div>
        <div className={css.iconButton}>
          <PauseIcon />
        </div>
        <div className={css.iconButton}>
          <StopIcon />
        </div>
        <div className={css.iconDivider} />
        <div className={`${css.iconButton} ${css.small}`}>
          <BackwardIcon />
        </div>
        <div className={`${css.iconButton} ${css.small}`}>
          <FastBackwardIcon />
        </div>
        <div className={`${css.iconButton} ${css.small}`}>
          <FastForwardIcon />
        </div>
        <div className={`${css.iconButton} ${css.small}`}>
          <ForwardIcon />
        </div>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default ShowCaseControl;
