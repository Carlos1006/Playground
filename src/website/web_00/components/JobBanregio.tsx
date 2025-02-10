import { FC } from "react";
import css from "../styles/skills.module.scss";
import { useTranslation } from "react-i18next";

const JobBanregio: FC = () => {
  const { t } = useTranslation();
  return (
    <p id={css.banregioJob}>
      <span>{t("job_banregio_frontend_developer")}</span>
      <ul>
        <li>
          <b>{t("job_banregio_database_management")}:</b>{" "}
          {t("job_banregio_database_management_description")}
        </li>
        <li>
          <b>{t("job_banregio_microservices_development")}:</b>{" "}
          {t("job_banregio_microservices_development_description")}
        </li>
        <li>
          <b>{t("job_banregio_internal_platform_development")}:</b>{" "}
          {t("job_banregio_internal_platform_development_description")}
        </li>
        <li>
          <b>{t("job_banregio_internal_customer_support")}:</b>{" "}
          {t("job_banregio_internal_customer_support_description")}
        </li>
        <li>
          <b>{t("job_banregio_collaboration_and_requirements_analysis")}:</b>{" "}
          {t(
            "job_banregio_collaboration_and_requirements_analysis_description"
          )}
        </li>
        <li>
          <b>{t("job_banregio_software_optimization_and_maintenance")}:</b>{" "}
          {t("job_banregio_software_optimization_and_maintenance_description")}
        </li>
        <li>
          <b>{t("job_banregio_user_feedback")}:</b>{" "}
          {t("job_banregio_user_feedback_description")}
        </li>
        <li>
          <b>{t("job_banregio_documentation_and_agile_project_management")}:</b>{" "}
          {t(
            "job_banregio_documentation_and_agile_project_management_description"
          )}
        </li>
      </ul>
    </p>
  );
};

export default JobBanregio;
