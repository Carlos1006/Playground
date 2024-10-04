import { FC } from "react";
import globalCss from "../styles/main.module.scss";

const St1r1: FC = () => {
  return (
    <>
      <div data-slot="st1r1-00" className={globalCss.slot} />
      <div data-slot="st1r1-01" className={globalCss.slot} />
    </>
  );
};

export default St1r1;
