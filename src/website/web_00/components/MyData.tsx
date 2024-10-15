import { FC } from "react";
import css from "../styles/myData.module.scss";
import { BIRTH_DATE } from ".";
import { getExactAge } from "../utils";
import GlitchText from "./GlitchText";

const MyData: FC = () => {
  const age = getExactAge(BIRTH_DATE);

  return (
    <div id={css.myData}>
      <h1>My Data</h1>
      <div id={css.myDataWrapper}>
        <span>Full name</span>
        <div className={css.value}>
          <div>
            <span>
              <GlitchText text="Carlos Daniel Gonzalez Lopez" />
            </span>
          </div>
        </div>
        <span>Birth Date</span>
        <div className={css.value}>
          <div>
            <span>
              <GlitchText text={BIRTH_DATE.format("dddd, MMMM Do YYYY")} />
            </span>
          </div>
        </div>
        <span>Age</span>
        <div className={css.value}>
          <div>
            <span>
              <GlitchText text={`${age} years old`} />
            </span>
          </div>
        </div>
        <span>Country</span>
        <div className={css.value}>
          <div>
            <span>
              <GlitchText text="Mexico" />
            </span>
          </div>
        </div>
        <span>State</span>
        <div className={css.value}>
          <div>
            <span>
              <GlitchText text="Nuevo Leon" />
            </span>
          </div>
        </div>
        <span>City</span>
        <div className={css.value}>
          <div>
            <span>
              <GlitchText text="Monterrey" />
            </span>
          </div>
        </div>
        <span>Phone</span>
        <div className={css.value}>
          <div>
            <span>
              <GlitchText text="+52 1 811 035 1117" />
            </span>
          </div>
        </div>
        <span>Email</span>
        <div className={css.value}>
          <div>
            <span>
              <GlitchText text="cdgzz19@gmail.com" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyData;
