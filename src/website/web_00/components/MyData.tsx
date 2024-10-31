import { FC } from "react";
import css from "../styles/myData.module.scss";
import { BIRTH_DATE } from ".";
import { getExactAge } from "../utils";
import GlitchText from "./GlitchText";
import img from "../../../assets/logotype/CD_white.png";
import useHomeContext from "../hooks/useHomeContext";
import { MODE } from "../constants";
import MyDataOld from "./MyDataOld";

const MyData: FC = () => {
  const { themeMode } = useHomeContext();
  const age = getExactAge(BIRTH_DATE);

  if (themeMode === MODE.OLD) return <MyDataOld />;

  return (
    <div id={css.myData}>
      <div id={css.myDataContent} data-mode={themeMode}>
        <h1>Mis Datos</h1>
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
        <div id={css.logo}>
          <img src={img} alt="logo" />{" "}
        </div>
      </div>
    </div>
  );
};

export default MyData;
