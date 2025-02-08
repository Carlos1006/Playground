import { FC, useState } from "react";
import css from "../styles/language.module.scss";
import useHomeContext from "../hooks/useHomeContext";
import { MexicoIcon } from "../icons/Mexico";
import { getThemeClass } from "../../../utils";
import { UsaIcon } from "../icons/Usa";

const Language: FC = () => {
  const { themeMode } = useHomeContext();

  const [active, setActive] = useState<boolean>(true);

  return (
    <div id={css.language}>
      <div id={css.toggle} className={getThemeClass(themeMode, css)}>
        <div
          className={css.flag}
          data-active={active ? 0 : 1}
          data-mode={themeMode}
          onClick={(): void => {
            // setThemeMode("es");
            setActive(false);
          }}
        >
          <UsaIcon />
        </div>
        <div
          className={css.flag}
          data-mode={themeMode}
          data-active={active ? 1 : 0}
          onClick={(): void => {
            // setThemeMode("en");
            setActive(true);
          }}
        >
          <MexicoIcon />
        </div>
      </div>
    </div>
  );
};

export default Language;
