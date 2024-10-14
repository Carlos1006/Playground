import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import ShortAboutMe from "./ShortAboutMe";

const Gt0l1: FC = () => {
  return (
    <div data-slot="gt0l1-00" className={`${globalCss.slot} ${globalCss.lock}`}>
      <ShortAboutMe />
    </div>
  );
};

export default Gt0l1;
