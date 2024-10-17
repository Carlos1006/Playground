import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import Certificates from "./Certificates";
import useHomeContext from "../hooks/useHomeContext";

const Gt2r0: FC = () => {
  const { themeMode } = useHomeContext();
  return (
    <div
      data-slot="gt2r0-00"
      data-mode={themeMode}
      className={`${globalCss.slot} ${globalCss.lock}`}
    >
      <Certificates />
    </div>
  );
};

export default Gt2r0;
