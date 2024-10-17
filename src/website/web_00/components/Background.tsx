import { FC } from "react";
import css from "../styles/background.module.scss";
import useHomeContext from "../hooks/useHomeContext";

const Background: FC = () => {
  const { themeMode } = useHomeContext();
  return <div className={css.background} data-mode={themeMode}></div>;
};

export default Background;
