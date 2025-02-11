import { FC, useEffect, useState } from "react";
import css from "../styles/showCase.module.scss";
import PlayIcon from "../icons/PlayIcon";
import PauseIcon from "../icons/PauseIcon";
import StopIcon from "../icons/StopIcon";
import BackwardIcon from "../icons/PreviewIcon";
import FastBackwardIcon from "../icons/FastBackwardIcon";
import FastForwardIcon from "../icons/FastForwardIcon";
import ForwardIcon from "../icons/NextIcon";
import { IShowCaseControl } from "../types";

const ShowCaseControl: FC<IShowCaseControl> = ({
  title,
  onBackward,
  onFastBackward,
  onFastForward,
  disableFastBackward,
  disableFastForward,
  onRangeChange,
  componentLength,
  index,
  onForward,
}: IShowCaseControl) => {
  const [value, setValue] = useState<number>(20);

  const onRangeChangeHandler = (value: number): void => {
    setValue(value);
    const index = Math.floor((value / 100) * componentLength);
    onRangeChange(index);
  };

  useEffect(() => {
    setValue(Math.floor((index / componentLength) * 100));
  }, [index, componentLength]);

  return (
    <div id={css.showCaseControl}>
      <input
        type="range"
        className={css.range}
        value={value}
        onChange={(e): void => onRangeChangeHandler(Number(e.target.value))}
        min="0"
        max="100"
      />
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
        <div
          className={`${css.iconButton} ${css.small}`}
          onClick={onBackward}
          aria-label="Previous"
          aria-roledescription="button"
        >
          <BackwardIcon />
        </div>
        <div
          className={`
            ${css.iconButton}
            ${css.small} ${disableFastBackward ? css.disabled : ""}
          `}
          onClick={onFastBackward}
          aria-label="First"
          aria-roledescription="button"
        >
          <FastBackwardIcon />
        </div>
        <div
          className={`
            ${css.iconButton} 
            ${css.small} ${disableFastForward ? css.disabled : ""}`}
          onClick={onFastForward}
          aria-label="Last"
          aria-roledescription="button"
        >
          <FastForwardIcon />
        </div>
        <div
          className={`${css.iconButton} ${css.small}`}
          onClick={onForward}
          aria-label="Next"
          aria-roledescription="button"
        >
          <ForwardIcon />
        </div>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default ShowCaseControl;
