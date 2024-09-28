import { FC, useEffect, useRef, useState } from "react";
import Loader from "./components/loader";
import { NAME } from "./constants";
import css from "./styles/welcome.module.scss";

const Web_12: FC = () => {
  const [hour, setHour] = useState<string>("00");
  const [minute, setMinute] = useState<string>("00");
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const interval = useRef<ReturnType<typeof setInterval>>(0);

  const [tumbler, setTumbler] = useState<boolean>(false);
  const [bigLogo, setBigLogo] = useState<boolean>(false);
  const [reducto, setReducto] = useState<boolean>(false);
  const [nameElement, setNameElement] = useState<boolean>(false);
  const [text, setText] = useState<boolean>(false);
  const [readMore, setReadMore] = useState<boolean>(false);
  const [rightSquare, setRightSquare] = useState<boolean>(false);
  const [rightText, setRightText] = useState<boolean>(false);
  const [go, setGo] = useState<boolean>(false);

  function checkDate(): void {
    const date = new Date();
    const minute = date.getMinutes();
    const hour = date.getHours();
    setHour(`${hour <= 9 ? "0" : ""}${hour}`);
    setMinute(`${minute <= 9 ? "0" : ""}${minute}`);
  }

  function animation(): void {
    setTimeout(() => {
      setShowLoader(false);
      setTimeout(() => {
        setTumbler(true);
        setTimeout(() => {
          setReducto(true);
          setNameElement(true);
        }, 150);
        setTimeout(() => {
          setText(true);
          setReadMore(true);
        }, 250);
        setTimeout(() => {
          setBigLogo(true);
          setGo(true);
        }, 200);
        setTimeout(() => {
          setRightSquare(true);
          setTimeout(() => {
            setRightText(true);
          }, 100);
        }, 300);
      }, 100);
    }, 1500);
  }

  useEffect(() => {
    checkDate();
    interval.current = setInterval(checkDate, 60000);
    animation();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <div>
      <div className={css.host}>
        <Loader show={showLoader}></Loader>
        <div id={css.background}>
          <div id={css.background2}></div>
        </div>
        <div id={css.tumbler} className={!tumbler ? css.hidden : ""}></div>
        <div id={css.bigLogo} className={!bigLogo ? css.hidden : ""}></div>
        <div id={css.bigHour} className="'hidden'">
          {hour} {minute}
        </div>
        <div id={css.appName}>
          <div id={css.reducto} className={!reducto ? css.hidden : ""}>
            <label>Reducto</label>
            <div className="dot"></div>
            <label>2022</label>
          </div>
          <span className={!nameElement ? css.hidden : ""}>{NAME}</span>
          <p className={!text ? css.hidden : ""}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit Pellentesque
            ac venenatis dolor a semper nulla.
          </p>
          <div id={css.learnMore} className={!readMore ? css.hidden : ""}>
            <span>Aprender mas</span>
          </div>
        </div>
        <div id={css.moreInfo} className={!rightSquare ? css.hidden : ""}>
          <span className={!rightText ? css.hidden : ""}>
            <label>Lorem ipsum</label> dolor sit amet adipi scing elit Pellen.
          </span>
          <div className={css.goDown}></div>
        </div>
        <div id={css.go} className={!go ? css.hidden : ""}>
          <div className={css.goStart}>
            <span>Comenzar</span>
          </div>
          <div className={css.goButton}></div>
        </div>
      </div>
      <div id={css.leftBar}>
        <div id={css.logo}></div>
      </div>
      <div id={css.body}>
        <div id={css.header}>
          <div id={css.menuButton}></div>
        </div>
        <div id={css.content}></div>
      </div>
    </div>
  );
};

export default Web_12;
