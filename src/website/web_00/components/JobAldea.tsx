import { FC } from "react";
import css from "../styles/skills.module.scss";
import { useTranslation } from "react-i18next";

const JobAldea: FC = () => {
  const { t } = useTranslation();
  return (
    <p id={css.aldeaJob}>
      <span>{t("job_aldea_frontend_developer")}</span>
      <ul>
        <li>
          <b>{t("job_aldea_web_development")}:</b>{" "}
          {t("job_aldea_web_development_description")}
        </li>
        <li>
          <b>{t("job_aldea_seo_optimization")}:</b>{" "}
          {t("job_aldea_seo_optimization_description")}
        </li>
        <li>
          <b>{t("job_aldea_results_analysis")}:</b>{" "}
          {t("job_aldea_results_analysis_description")}
        </li>
      </ul>
    </p>
  );
};

export default JobAldea;
