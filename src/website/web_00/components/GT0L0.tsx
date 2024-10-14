import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import AboutMe from "./AboutMe";

const Gt0l0: FC = () => {
  return (
    <div data-slot="gt0l0-00" className={`${globalCss.slot} ${globalCss.lock}`}>
      <AboutMe />
    </div>
  );
};

export default Gt0l0;
