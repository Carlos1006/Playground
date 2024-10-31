import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import ShowCase from "./ShowCase";
import css from "../styles/center0.module.scss";
import useHomeContext from "../hooks/useHomeContext";
import OldMenuSlot from "./OldMenuSlot";
import { MODE } from "../constants";

const Center0: FC = () => {
  const { themeMode } = useHomeContext();
  return (
    <div
      data-slot="c0000-00"
      data-mode={themeMode}
      id={css.center0}
      className={globalCss.slot}
    >
      <OldMenuSlot />
      {themeMode === MODE.OLD && <div id={css.oldShowCaseScreen} />}
      <div className={css.showCaseTitle}>
        <h1>Algo de mi Trabajo</h1>
        {themeMode !== MODE.OLD && (
          // <p>Here are some of the personal projects I have worked on.</p>
          <p>
            Aqui hay algunos de los proyectos personales en los que he
            trabajado.
          </p>
        )}
      </div>
      <ShowCase />
    </div>
  );
};

export default Center0;
