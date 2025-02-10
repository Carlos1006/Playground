import { FC } from "react";
import css from "../styles/skills.module.scss";
import { useTranslation } from "react-i18next";

const JobOnephase: FC = () => {
  const { t } = useTranslation();
  return (
    <p id={css.onephaseJob}>
      <span>{t("job_onephase_frontend_web_developer")}</span>
      <ul>
        <li>
          <b>{t("job_onephase_legacy_platform_migration")}:</b>{" "}
          {t("job_onephase_legacy_platform_migration_description")}
        </li>
        <li>
          <b>{t("job_onephase_component_documentation")}:</b>{" "}
          {t("job_onephase_component_documentation_description")}
        </li>
        <li>
          <b>{t("job_onephase_ui_optimization")}:</b>{" "}
          {t("job_onephase_ui_optimization_description")}
        </li>
      </ul>
    </p>
  );
};

export default JobOnephase;
