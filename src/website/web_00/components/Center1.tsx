import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import Certificates from "./Certificates";

const Center1: FC = () => {
  return (
    <div data-slot="c1000-00" className={globalCss.slot}>
      <Certificates />
    </div>
  );
};

export default Center1;
