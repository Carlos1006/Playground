import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import Schooling from "./Schooling";
import useHomeContext from "../hooks/useHomeContext";
import css from "../styles/center1.module.scss";
import OldMenuSlot from "./OldMenuSlot";

const Center1: FC = () => {
  const { themeMode } = useHomeContext();
  return (
    <div
      id={css.center1}
      data-slot="c1000-00"
      data-mode={themeMode}
      className={globalCss.slot}
    >
      <Schooling />
      <OldMenuSlot />
    </div>
  );
};

export default Center1;
