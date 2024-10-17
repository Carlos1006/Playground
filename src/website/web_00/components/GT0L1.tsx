import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import Me from "./Me";
import useHomeContext from "../hooks/useHomeContext";

const Gt0l1: FC = () => {
  const { themeMode } = useHomeContext();

  return (
    <div
      data-slot="gt0l1-00"
      data-mode={themeMode}
      className={`${globalCss.slot} ${globalCss.lock}`}
    >
      <Me />
    </div>
  );
};

export default Gt0l1;
