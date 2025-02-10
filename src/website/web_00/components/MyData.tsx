import { FC } from "react";
import css from "../styles/myData.module.scss";
import { getExactAge } from "../utils";
import GlitchText from "./GlitchText";
import img from "../../../assets/logotype/CD_white.png";
import useHomeContext from "../hooks/useHomeContext";
import { BIRTH_DATE, EMAIL, FULL_NAME, MODE, PHONE_NUMBER } from "../constants";
import MyDataOld from "./MyDataOld";
import { useTranslation } from "react-i18next";

const MyData: FC = () => {
  const { themeMode } = useHomeContext();
  const age = getExactAge(BIRTH_DATE);
  const { t } = useTranslation();

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
                <GlitchText text={FULL_NAME} />
              </span>
            </div>
          </div>
          <span>Birth Date</span>
          <div className={css.value}>
            <div>
              <span>
                <GlitchText text={t("birth_date")} />
              </span>
            </div>
          </div>
          <span>Age</span>
          <div className={css.value}>
            <div>
              <span>
                <GlitchText text={`${age} ${t("years_old")}`} />
              </span>
            </div>
          </div>
          <span>Country</span>
          <div className={css.value}>
            <div>
              <span>
                <GlitchText text={t("homeland")} />
              </span>
            </div>
          </div>
          <span>State</span>
          <div className={css.value}>
            <div>
              <span>
                <GlitchText text={t("state")} />
              </span>
            </div>
          </div>
          <span>City</span>
          <div className={css.value}>
            <div>
              <span>
                <GlitchText text={t("city")} />
              </span>
            </div>
          </div>
          <span>Phone</span>
          <div className={css.value}>
            <div>
              <span>
                <GlitchText text={PHONE_NUMBER} />
              </span>
            </div>
          </div>
          <span>Email</span>
          <div className={css.value}>
            <div>
              <span>
                <GlitchText text={EMAIL} />
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
