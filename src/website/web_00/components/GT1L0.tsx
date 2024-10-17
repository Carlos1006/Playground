import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import MyData from "./MyData";
import useHomeContext from "../hooks/useHomeContext";

const Gt1l0: FC = () => {
  const { themeMode } = useHomeContext();

  return (
    <div data-slot="gt1l0-00" data-mode={themeMode} className={globalCss.slot}>
      <MyData />
    </div>
  );
};

export default Gt1l0;
