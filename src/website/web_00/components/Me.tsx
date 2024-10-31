import { FC } from "react";
import css from "../styles/me.module.scss";
import useHomeContext from "../hooks/useHomeContext";

const Me: FC = () => {
  const { themeMode } = useHomeContext();

  return (
    <div id={css.me} data-mode={themeMode}>
      <h1>Yo</h1>
    </div>
  );
};

export default Me;
