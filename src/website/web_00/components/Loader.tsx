import { FC } from "react";
import { ILoader } from "../types";
import css from "../styles/loader.module.scss";

const Loader: FC<ILoader> = ({ className = "" }: ILoader) => {
  return <div className={`${className} ${css.loader}`} />;
};

export default Loader;
