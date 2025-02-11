import { FC } from "react";
import css from "../styles/myData.module.scss";
import { getExactAge } from "../utils";
import GlitchText from "./GlitchText";
import img from "../../../assets/logotype/CD_white.png";
import useHomeContext from "../hooks/useHomeContext";
import { BIRTH_DATE, EMAIL, FULL_NAME, PHONE_NUMBER } from "../constants";
import { useTranslation } from "react-i18next";

const MyDataOld: FC = () => {
  const { t } = useTranslation();
  const { themeMode } = useHomeContext();
  const age = getExactAge(BIRTH_DATE);

  return (
    <div id={css.myDataOld}>
      <div id={css.myDataContent} data-mode={themeMode}>
        <h1>{t("my_data")}</h1>
        <div id={css.myDataWrapper}>
          <div>
            <span className={css.bold}>{t("full_name")}</span>
          </div>
          <div>
            <span>
              <GlitchText text={FULL_NAME} />
            </span>
          </div>
          <div />
          <div>
            <span className={css.bold}>{t("birth_day")}</span>
          </div>
          <div>
            <span>
              <GlitchText text={t("birth_date")} />
            </span>
          </div>
          <div />
          <div>
            <span className={css.bold}>{t("age")}</span>
          </div>
          <div>
            <span>
              <GlitchText text={`${age} years old`} />
            </span>
          </div>
          <div />
          <div>
            <span className={css.bold}>{t("country")}</span>
          </div>
          <div>
            <span>
              <GlitchText text={t("homeland")} />
            </span>
          </div>
          <div />
          <div>
            <span className={css.bold}>{t("state")}</span>
          </div>
          <div>
            <span>
              <GlitchText text={t("nuevo_leon")} />
            </span>
          </div>
          <div />
          <div>
            <span className={css.bold}>{t("city")}</span>
          </div>
          <div>
            <span>
              <GlitchText text={t("monterrey")} />
            </span>
          </div>
          <div />
          <div>
            <span className={css.bold}>{t("phone")}</span>
          </div>
          <div>
            <span>
              <GlitchText text={PHONE_NUMBER} />
            </span>
          </div>
          <div />
          <div>
            <span className={css.bold}>{t("email")}</span>
          </div>
          <div>
            <span>
              <GlitchText text={EMAIL} />
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
