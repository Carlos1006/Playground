import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import CoreCompetencies from "./CoreCompetencies";
import useHomeContext from "../hooks/useHomeContext";

const Gt0l2: FC = () => {
  const { themeMode } = useHomeContext();

  return (
    <div
      data-slot="gt0l2-00"
      data-mode={themeMode}
      className={`${globalCss.slot} ${globalCss.lock}`}
    >
      <CoreCompetencies />
    </div>
  );
};

export default Gt0l2;
