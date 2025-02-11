import { FC } from "react";
import css from "../styles/coreCompetencies.module.scss";
import useHomeContext from "../hooks/useHomeContext";
import { useTranslation } from "react-i18next";

const CoreCompetenciesOld: FC = () => {
  const { themeMode } = useHomeContext();
  const { t } = useTranslation();

  return (
    <div id={css.coreCompetencies} data-mode={themeMode}>
      <h1>{t("core_competencies_title")}</h1>
      <div id={css.coreCompetenciesWrapper}>
        <span>C://Windows/MyData/Carlos/CoreCompetencies&gt; cd</span>
        <span># showing core competencies: </span>
        <span>
          <i>-ds</i> {t("software_development")}
        </span>
        <span>
          <i>-sw</i> {t("web_services")}
        </span>
        <span>
          <i>-rr</i> {t("requirements_gathering")}
        </span>
        <span>
          <i>-dw</i> {t("web_development")}
        </span>
        <span>
          <i>-it</i> {t("technology_integration")}
        </span>
        <span>
          <i>-le</i> {t("team_leadership")}
        </span>
        <span>
          <i>-sp</i> {t("scripting_and_programming")}
        </span>
        <span>
          <i>-rp</i> {t("problem_solving")}
        </span>
        <span>
          <i>-d</i> {t("documentation")}
        </span>
        <span>
          <i>-pc</i> {t("critical_thinking")}
        </span>
        <span>
          <i>-te</i> {t("teamwork")}
        </span>
        <span>
          <i>-p</i> {t("prioritization")}
        </span>
        <span>
          <i>-me</i> {t("equipment_maintenance")}
        </span>
        <span>
          <i>-at</i> {t("technological_adaptability")}
        </span>
        <span>
          <i>-pe</i> {t("productivity_and_efficiency_with_ai")}
        </span>
        <span>
          <i>-td</i> {t("informed_decision_making")}
        </span>
      </div>
    </div>
  );
};

export default CoreCompetenciesOld;
