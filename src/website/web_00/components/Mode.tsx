import { FC, useState } from "react";
import { ThemeMode } from "../types";
import { MODE } from "../constants";
import css from "../styles/mode.module.scss";

const Mode: FC = () => {
  const [mode, setMode] = useState<ThemeMode>(MODE.DARK);

  const toggleMode = (): void => {
    setMode((prev) => (prev === MODE.LIGHT ? MODE.DARK : MODE.LIGHT));
  };

  return (
    <div id={css.mode} onClick={toggleMode}>
      <div
        id={css.toggler}
        className={mode === MODE.DARK ? css.dark : css.light}
      >
        <div />
      </div>
    </div>
  );
};

export default Mode;
