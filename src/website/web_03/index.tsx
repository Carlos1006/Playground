import React from "react";
import css from "./styles/main.module.scss";
import logotypeImg from "./assets/images/Icon5002.png";
import Scene from "./components/Scene";

const Web_03: React.FC = () => {
  return (
    <>
      <nav>
        <a id={css.mainIcon}>
          <img src={logotypeImg} />
          <span>Titulo</span>
        </a>
        <div id={css.headerLine}></div>
        <div id={css.linkContainer}>
          <span>
            <a>Lorem</a>
          </span>
          <span>
            <a>Ipsum</a>
          </span>
          <span>
            <a>Sit dis</a>
          </span>
          <span>
            <a>laoreet</a>
          </span>
        </div>
      </nav>
      <Scene id={css.reducto}>
        <div id={css.infoReducto}>
          <div id={css.central}>
            <h1>
              <span>P</span>
              <span>AGINA</span>
            </h1>
            <p>
              Carlos <br />
              Daniel
            </p>
            <div id={css.margin}></div>
          </div>
          <div id={css.right}></div>
          <div hidden id={css.message}></div>
          <div id={css.leftLine}></div>
          <div id={css.rightLine}></div>
          <div id={css.bottomLine}></div>
        </div>
      </Scene>
    </>
  );
};

export default Web_03;
