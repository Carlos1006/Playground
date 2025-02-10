import { FC } from "react";
import css from "../styles/skills.module.scss";
import { useTranslation } from "react-i18next";

const JobMasttro: FC = () => {
  const { t } = useTranslation();
  return (
    <div id={css.masttroJob} className={css.job}>
      <span>{t("job_masttro_frontend_web_developer")}</span>
      <ul>
        <li>
          <b>{t("job_masttro_legacy_platform_migration")}:</b>{" "}
          {t("job_masttro_legacy_platform_migration_description")}
        </li>
        <li>
          <b>{t("job_masttro_ui_ux_modernization_and_improvement")}:</b>{" "}
          {t("job_masttro_ui_ux_modernization_and_improvement_description")}
        </li>
        <li>
          <b>{t("job_masttro_team_collaboration")}:</b>{" "}
          {t("job_masttro_team_collaboration_description")}
        </li>
      </ul>
    </div>
  );
};

export default JobMasttro;
