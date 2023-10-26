import React from "react";
import css from "./style/main.module.scss";
import { PROFILES } from "./constants";
import { IProfile } from "./types";

const Web_02: React.FC = () => {
  return (
    <div id={css.main}>
      <div id={css.roof}></div>
      <div id={css.visorContainer}>
        <div id={css.navLeft} className={css.navigator}></div>
        <div id={css.navRight} className={css.navigator}></div>
        <div id={css.visor}>
          {PROFILES.reverse().map((profile: IProfile, index: number) => {
            const { image } = profile;
            return (
              <div key={index} className={css.card}>
                <img src={image} />
              </div>
            );
          })}
        </div>
      </div>
      <div id={css.spinner}></div>
    </div>
  );
};

export default Web_02;
