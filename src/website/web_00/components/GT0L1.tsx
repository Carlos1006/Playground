import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import Me from "./Me";

const Gt0l1: FC = () => {
  return (
    <div data-slot="gt0l1-00" className={`${globalCss.slot} ${globalCss.lock}`}>
      <Me />
    </div>
  );
};

export default Gt0l1;
