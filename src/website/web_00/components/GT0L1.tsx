import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import Me from "./Me";
import useHomeContext from "../hooks/useHomeContext";
import css from "../styles/gt0l1.module.scss";
import OldMenuSlot from "./OldMenuSlot";

const Gt0l1: FC = () => {
  const { themeMode } = useHomeContext();

  return (
    <div
      id={css.gt0l1}
      data-slot="gt0l1-00"
      data-mode={themeMode}
      className={`${globalCss.slot} ${globalCss.lock}`}
    >
      <Me />
      <OldMenuSlot />
    </div>
  );
};

export default Gt0l1;
