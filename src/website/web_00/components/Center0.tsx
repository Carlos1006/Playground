import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import ShowCase from "./ShowCase";
import css from "../styles/center0.module.scss";
import useHomeContext from "../hooks/useHomeContext";

const Center0: FC = () => {
  const { themeMode } = useHomeContext();
  return (
    <div
      data-slot="c0000-00"
      data-mode={themeMode}
      id={css.center0}
      className={globalCss.slot}
    >
      <div className={css.showCaseTitle}>
        <h1>Some of my work</h1>
        <p>Here are some of the personal projects I have worked on.</p>
      </div>
      <ShowCase />
    </div>
  );
};

export default Center0;
