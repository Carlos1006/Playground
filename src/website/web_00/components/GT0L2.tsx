import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import CoreCompetencies from "./CoreCompetencies";

const Gt0l2: FC = () => {
  return (
    <div data-slot="gt0l2-00" className={`${globalCss.slot} ${globalCss.lock}`}>
      <CoreCompetencies />
    </div>
  );
};

export default Gt0l2;
