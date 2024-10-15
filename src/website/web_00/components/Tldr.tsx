import { FC } from "react";
import css from "../styles/tldr.module.scss";
import { ITldr } from "../types";

const Tldr: FC<ITldr> = ({ active, onClick }: ITldr) => {
  return (
    <button
      id={css.tldr}
      className={active ? css.active : ""}
      onClick={onClick}
    >
      TLDR
    </button>
  );
};

export default Tldr;
