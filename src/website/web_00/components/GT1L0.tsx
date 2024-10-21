import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import MyData from "./MyData";
import useHomeContext from "../hooks/useHomeContext";
import css from "../styles/gt1l0.module.scss";
import OldMenuSlot from "./OldMenuSlot";

const Gt1l0: FC = () => {
  const { themeMode } = useHomeContext();

  return (
    <div
      id={css.gt1l0}
      data-slot="gt1l0-00"
      data-mode={themeMode}
      className={globalCss.slot}
    >
      <MyData />
      <OldMenuSlot />
    </div>
  );
};

export default Gt1l0;
