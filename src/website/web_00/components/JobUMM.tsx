import { FC } from "react";
import css from "../styles/skills.module.scss";
import { useTranslation } from "react-i18next";

const JobUMM: FC = () => {
  const { t } = useTranslation();
  return (
    <p id={css.ummJob}>
      <span>{t("job_umm_full_stack_web_developer")}</span>
      <ul>
        <li>
          <b>{t("job_umm_database_management")}:</b>{" "}
          {t("job_umm_database_management_description")}
        </li>
        <li>
          <b>{t("job_umm_web_application_development")}:</b>{" "}
          {t("job_umm_web_application_development_description")}
        </li>
        <li>
          <b>{t("job_umm_interdepartmental_collaboration")}:</b>{" "}
          {t("job_umm_interdepartmental_collaboration_description")}
        </li>
        <li>
          <b>{t("job_umm_software_design_and_optimization")}:</b>{" "}
          {t("job_umm_software_design_and_optimization_description")}
        </li>
        <li>
          <b>{t("job_umm_maintenance_and_continuous_improvement")}:</b>{" "}
          {t("job_umm_maintenance_and_continuous_improvement_description")}
        </li>
        <li>
          <b>{t("job_umm_technical_documentation")}:</b>{" "}
          {t("job_umm_technical_documentation_description")}
        </li>
      </ul>
    </p>
  );
};

export default JobUMM;
