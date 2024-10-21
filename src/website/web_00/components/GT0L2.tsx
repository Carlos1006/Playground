import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import CoreCompetencies from "./CoreCompetencies";
import useHomeContext from "../hooks/useHomeContext";
import OldMenuSlot from "./OldMenuSlot";
import css from "../styles/gt0l2.module.scss";

const Gt0l2: FC = () => {
  const { themeMode } = useHomeContext();

  return (
    <div
      id={css.gt0l2}
      data-slot="gt0l2-00"
      data-mode={themeMode}
      className={`${globalCss.slot} ${globalCss.lock}`}
    >
      <CoreCompetencies />
      <OldMenuSlot />
    </div>
  );
};

export default Gt0l2;
