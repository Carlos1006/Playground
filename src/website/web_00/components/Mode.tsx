import { FC } from "react";
import { ThemeMode } from "../types";
import { MODE } from "../constants";
import css from "../styles/mode.module.scss";
import { WindowsIcon } from "../icons/Windows";
import useHomeContext from "../hooks/useHomeContext";

const Mode: FC = () => {
  const { themeMode, setThemeMode } = useHomeContext();

  const toggleMode = (): void => {
    setThemeMode((prev: ThemeMode) =>
      prev === MODE.LIGHT ? MODE.DARK : MODE.LIGHT
    );
  };

  const onOldMode = (): void => {
    setThemeMode((prev: ThemeMode) =>
      prev === MODE.OLD ? MODE.DARK : MODE.OLD
    );
  };

  return (
    <div id={css.mode}>
      <div
        id={css.toggler}
        onClick={toggleMode}
        className={
          themeMode === MODE.DARK
            ? css.dark
            : themeMode === MODE.LIGHT
            ? css.light
            : css.old
        }
      >
        <div />
      </div>
      <div
        id={css.oldMode}
        onClick={onOldMode}
        data-mode={themeMode}
        className={themeMode === MODE.OLD ? css.active : ""}
      >
        <WindowsIcon />
      </div>
    </div>
  );
};

export default Mode;
