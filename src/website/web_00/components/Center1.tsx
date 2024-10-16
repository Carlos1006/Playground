import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import Schooling from "./Schooling";

const Center1: FC = () => {
  return (
    <div data-slot="c1000-00" className={globalCss.slot}>
      <Schooling />
    </div>
  );
};

export default Center1;
