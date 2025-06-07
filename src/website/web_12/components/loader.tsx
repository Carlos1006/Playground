import { FC, useCallback, useEffect, useRef, useState } from "react";
import css from "../styles/loader.module.scss";

interface ILoader {
  show: boolean;
}

const Loader: FC<ILoader> = ({ show: showExternal }: ILoader) => {
  const showRef = useRef<boolean>(showExternal);
  const [show, setShow] = useState(showExternal);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    setShow(showExternal);
  }, [showExternal]);

  const animation = useCallback((): void => {
    setTimeout(() => {
      setAnimationClass("width");
      setTimeout(() => {
        setAnimationClass("widthAndBrown");
        setTimeout(() => {
          setAnimationClass("hideToRight");
          setTimeout(() => {
            setAnimationClass("");
            setTimeout(() => {
              if (showRef.current) {
                animation();
              } else {
                return;
              }
            }, 50);
          }, 200);
        }, 300);
      }, 300);
    }, 500);
  }, []);

  useEffect(() => {
    setShow(true);
    showRef.current = true;
    animation();
    return () => {
      showRef.current = false;
      setShow(false);
    };
  }, [animation]);

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
