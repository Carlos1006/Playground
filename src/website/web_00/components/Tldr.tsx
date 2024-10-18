import { FC } from "react";
import css from "../styles/tldr.module.scss";
import { ITldr } from "../types";
import useHomeContext from "../hooks/useHomeContext";

const Tldr: FC<ITldr> = ({ active, onClick }: ITldr) => {
  const { themeMode } = useHomeContext();

  return (
    <button
      id={css.tldr}
      className={active ? css.active : ""}
      onClick={onClick}
      data-mode={themeMode}
    >
      TLDR
    </button>
  );
};

export default Tldr;
