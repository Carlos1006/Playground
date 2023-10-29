import css from "./../styles/loader.module.scss";
import { FC } from "react";

interface ILoader {
  show: boolean;
}

const Loader: FC<ILoader> = ({ show }: ILoader) => {
  return (
    <>
      <div className={`${css.loader} ${show ? css.show : ""}`}>
        <div className={css.loaderHexagon}>
          {new Array(10).fill(0).map((_, i) => (
            <div className={css.smoke} data-index={i}></div>
          ))}
          <div className={css.bong}></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
