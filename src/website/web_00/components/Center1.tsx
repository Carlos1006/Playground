import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import Schooling from "./Schooling";
import useHomeContext from "../hooks/useHomeContext";

const Center1: FC = () => {
  const { themeMode } = useHomeContext();
  return (
    <div data-slot="c1000-00" data-mode={themeMode} className={globalCss.slot}>
      <Schooling />
    </div>
  );
};

export default Center1;
