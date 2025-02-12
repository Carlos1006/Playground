import { FC } from "react";
import { MODE } from "../constants";
import css from "../styles/mode.module.scss";
// import { WindowsIcon } from "../icons/Windows";
import oldpcImage from "../assets/oldpc.png";
import useHomeContext from "../hooks/useHomeContext";
import { getThemeClass } from "../../../utils";

const Mode: FC = () => {
  const { themeMode, setAndPersistThemeMode } = useHomeContext();

  const toggleMode = (): void => {
    setAndPersistThemeMode(themeMode === MODE.LIGHT ? MODE.DARK : MODE.LIGHT);
  };

  const onOldMode = (): void => {
    setAndPersistThemeMode(themeMode === MODE.OLD ? MODE.DARK : MODE.OLD);
  };

  return (
    <div id={css.mode}>
      <div
        id={css.toggler}
        onClick={toggleMode}
        className={getThemeClass(themeMode, css)}
      >
        <div />
      </div>
      <div
        id={css.oldMode}
        onClick={onOldMode}
        data-mode={themeMode}
        className={themeMode === MODE.OLD ? css.active : ""}
      >
        {/* <WindowsIcon /> */}
        <img src={oldpcImage} alt="Windows" />
      </div>
    </div>
  );
};

export default Mode;
