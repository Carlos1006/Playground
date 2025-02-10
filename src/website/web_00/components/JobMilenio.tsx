import { FC } from "react";
import css from "../styles/skills.module.scss";
import { useTranslation } from "react-i18next";

const JobMilenio: FC = () => {
  const { t } = useTranslation();
  return (
    <p id={css.milenioJob}>
      <span>{t("job_milenio_frontend_developer")}</span>
      <ul>
        <li>
          <b>{t("job_milenio_api_optimization_and_maintenance")}:</b>
          {t("job_milenio_api_optimization_and_maintenance_description")}
        </li>
        <li>
          <b>{t("job_milenio_error_monitoring_and_automated_reports")}:</b>
          {t("job_milenio_error_monitoring_and_automated_reports_description")}
        </li>
      </ul>
    </p>
  );
};

export default JobMilenio;
