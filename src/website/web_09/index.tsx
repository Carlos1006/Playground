import css from "./styles/main.module.scss";
import { useMemo, useState } from "react";
import { FUTURE_CITIES } from "./constants";

const Web_09 = () => {
  const [state, setState] = useState<0 | 1 | 2>(0);
  const [hide, setHide] = useState(false);
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState(0);
  const [busy, setBusy] = useState(false);

  const [hideName, setHideName] = useState(false);
  const [showName, setShowName] = useState(false);

  const onClick = async () => {
    if (busy) return;
    setBusy(true);
    setShow(true);
    await new Promise((r) => setTimeout(r, 100));
    setState(1);
    await new Promise((r) => setTimeout(r, 600));
    setHideName(true);
    setShowName(true);
    setHide(true);
    await new Promise((r) => setTimeout(r, 400));
    setState(0);
    await new Promise((r) => setTimeout(r, 500));
    await new Promise((r) => setTimeout(r, 100));
    const next = current + 1 > FUTURE_CITIES.length - 1 ? 0 : current + 1;
    setCurrent(next);
    setHideName(false);
    setShowName(false);
    setHide(false);
    await new Promise((r) => setTimeout(r, 100));
    setShow(false);
    setBusy(false);
  };

  const cityNow = useMemo(() => {
    return FUTURE_CITIES[current];
  }, [current]);

  const next = useMemo(() => {
    return current + 1 > FUTURE_CITIES.length - 1 ? 0 : current + 1;
  }, [current]);

  const cityNext = useMemo(() => {
    return FUTURE_CITIES[next];
  }, [next]);

  return (
    <div id={css.main}>
      <div id={css.page}>
        <div id={css.title}>REDUCTO</div>
        <button className={css.btn} onClick={onClick}>
          NEXT
        </button>
        <div
          id={css.nowName}
          className={`${css.name} ${hideName ? css.hide : ""}`}
        >
          <div className={css.first}>{cityNow.name}</div>
          <div className={css.last}>{cityNow.description}</div>
        </div>
        <div
          id={css.nextName}
          className={`${css.name} ${showName ? css.show : ""}`}
        >
          <div className={css.first}>{cityNext.name}</div>
          <div className={css.last}>{cityNext.description}</div>
        </div>
      </div>
      <div
        id={css.frame}
        className={`${css[`state-${state}`]} ${hide ? css.hide : ""}`}
      >
        {show && <img src={cityNext.img} className={css.back}></img>}
        <img src={cityNow.img} className={css.front}></img>
        {show && (
          <img src={cityNext.img} className={`${css.rotate} ${css.back}`}></img>
        )}
        <img src={cityNow.img} className={`${css.rotate} ${css.front}`}></img>
        <div id={css.ring}>
          {show && <img src={cityNext.img} className={css.back}></img>}
          <img src={cityNow.img} className={css.front}></img>
          <div id={css.core}>
            {show && <img src={cityNext.img} className={css.back}></img>}
            <img src={cityNow.img} className={css.front}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Web_09;
