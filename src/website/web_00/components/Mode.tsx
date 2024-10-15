import { FC, useState } from "react";
import { ThemeMode } from "../types";
import { MODE } from "../constants";
import css from "../styles/mode.module.scss";
import { WindowsIcon } from "../icons/Windows";

const Mode: FC = () => {
  const [mode, setMode] = useState<ThemeMode>(MODE.DARK);

  const toggleMode = (): void => {
    setMode((prev) => (prev === MODE.LIGHT ? MODE.DARK : MODE.LIGHT));
  };

  const onOldMode = (): void => {
    setMode((prev) => (prev === MODE.OLD ? MODE.DARK : MODE.OLD));
  };

  return (
    <div id={css.mode}>
      <div
        id={css.toggler}
        onClick={toggleMode}
        className={
          mode === MODE.DARK
            ? css.dark
            : mode === MODE.LIGHT
            ? css.light
            : css.old
        }
      >
        <div />
      </div>
      <div
        id={css.oldMode}
        onClick={onOldMode}
        className={mode === MODE.OLD ? css.active : ""}
      >
        <WindowsIcon />
      </div>
    </div>
  );
};

export default Mode;
