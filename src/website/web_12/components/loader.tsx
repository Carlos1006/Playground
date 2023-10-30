import { FC, useEffect, useState } from "react";
import css from "../styles/loader.module.scss";

interface ILoader {
  show: boolean;
}

const Loader: FC<ILoader> = ({ show: showExternal }: ILoader) => {
  const [show, setShow] = useState(showExternal);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    setShow(showExternal);
  }, [showExternal]);

  function animation(): void {
    setTimeout(() => {
      setAnimationClass("width");
      setTimeout(() => {
        setAnimationClass("widthAndBrown");
        setTimeout(() => {
          setAnimationClass("hideToRight");
          setTimeout(() => {
            setAnimationClass("");
            setTimeout(() => {
              if (show) {
                animation();
              } else {
                return;
              }
            }, 50);
          }, 200);
        }, 300);
      }, 300);
    }, 500);
  }

  useEffect(() => {
    setShow(true);
    animation();
    return () => {
      setShow(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={`${show ? css.show : ""} ${css.loader}`}>
        <div className={css[animationClass]}></div>
        <div className={css[animationClass]}></div>
        <div className={css[animationClass]}></div>
      </div>
    </>
  );
};

export default Loader;
