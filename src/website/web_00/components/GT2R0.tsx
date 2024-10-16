import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import Certificates from "./Certificates";

const Gt2r0: FC = () => {
  return (
    <div data-slot="gt2r0-00" className={`${globalCss.slot} ${globalCss.lock}`}>
      <Certificates />
    </div>
  );
};

export default Gt2r0;
