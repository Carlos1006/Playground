import { FC } from "react";
import css from "../styles/myData.module.scss";
import { getExactAge } from "../utils";
import GlitchText from "./GlitchText";
import img from "../../../assets/logotype/CD_white.png";
import useHomeContext from "../hooks/useHomeContext";
import { BIRTH_DATE, FULL_NAME } from "../constants";

const MyDataOld: FC = () => {
  const { themeMode } = useHomeContext();
  const age = getExactAge(BIRTH_DATE);

  return (
    <div id={css.myDataOld}>
      <div id={css.myDataContent} data-mode={themeMode}>
        <h1>My Data</h1>
        <div id={css.myDataWrapper}>
          <div>
            <span className={css.bold}>Full name</span>
          </div>
          <div>
            <span>
              <GlitchText text={FULL_NAME} />
            </span>
          </div>
          <div />
          <div>
            <span className={css.bold}>Birth Date</span>
          </div>
          <div>
            <span>
              <GlitchText text={BIRTH_DATE.format("dddd, MMMM Do YYYY")} />
            </span>
          </div>
          <div />
          <div>
            <span className={css.bold}>Age</span>
          </div>
          <div>
            <span>
              <GlitchText text={`${age} years old`} />
            </span>
          </div>
          <div />
          <div>
            <span className={css.bold}>Country</span>
          </div>
          <div>
            <span>
              <GlitchText text="Mexico" />
            </span>
          </div>
          <div />
          <div>
            <span className={css.bold}>State</span>
          </div>
          <div>
            <span>
              <GlitchText text="Nuevo Leon" />
            </span>
          </div>
          <div />
          <div>
            <span className={css.bold}>City</span>
          </div>
          <div>
            <span>
              <GlitchText text="Monterrey" />
            </span>
          </div>
          <div />
          <div>
            <span className={css.bold}>Phone</span>
          </div>
          <div>
            <span>
              <GlitchText text="+52 1 811 035 1117" />
            </span>
          </div>
          <div />
          <div>
            <span className={css.bold}>Email</span>
          </div>
          <div>
            <span>
              <GlitchText text="cdgzz19@gmail.com" />
            </span>
          </div>
          <div />
          <div className={css.colspan2}>
            <div id={css.logo}>
              <img src={img} alt="logo" />
            </div>
          </div>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div className={css.noBorder} />
          <div className={css.noBorder} />
          <div className={css.noBorder} />
        </div>
      </div>
    </div>
  );
};

export default MyDataOld;
