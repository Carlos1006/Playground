import { FC } from "react";
import css from "../styles/coreCompetencies.module.scss";
import useHomeContext from "../hooks/useHomeContext";
import { MODE } from "../constants";
import CoreCompetenciesOld from "./CoreCompetenciesOld";
import { useTranslation } from "react-i18next";

const CoreCompetencies: FC = () => {
  const { themeMode } = useHomeContext();
  const { t } = useTranslation();

  if (themeMode === MODE.OLD) return <CoreCompetenciesOld />;

  return (
    <div id={css.coreCompetencies} data-mode={themeMode}>
      <h1>{t("core_competencies_title")}</h1>
      <div id={css.coreCompetenciesWrapper}>
        <span>{t("software_development")}</span>
        <span>{t("web_services")}</span>
        <span>{t("requirements_gathering")}</span>
        <span>{t("web_development")}</span>
        <span>{t("technology_integration")}</span>
        <span>{t("team_leadership")}</span>
        <span>{t("scripting_and_programming")}</span>
        <span>{t("problem_solving")}</span>
        <span>{t("documentation")}</span>
        <span>{t("critical_thinking")}</span>
        <span>{t("teamwork")}</span>
        <span>{t("prioritization")}</span>
        <span>{t("equipment_maintenance")}</span>
        <span>{t("technological_adaptability")}</span>
        <span>{t("productivity_and_efficiency_with_ai")}</span>
        <span>{t("informed_decision_making")}</span>
      </div>
    </div>
  );
};

export default CoreCompetencies;
