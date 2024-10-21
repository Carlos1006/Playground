import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import Certificates from "./Certificates";
import useHomeContext from "../hooks/useHomeContext";
import css from "../styles/gt2r0.module.scss";
import OldMenuSlot from "./OldMenuSlot";

const Gt2r0: FC = () => {
  const { themeMode } = useHomeContext();
  return (
    <div
      id={css.gt2r0}
      data-slot="gt2r0-00"
      data-mode={themeMode}
      className={`${globalCss.slot} ${globalCss.lock}`}
    >
      <Certificates />
      <OldMenuSlot />
    </div>
  );
};

export default Gt2r0;
