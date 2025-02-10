import { FC } from "react";
import { useTranslation } from "react-i18next";
import css from "../styles/skills.module.scss";
import { IJobDates } from "../types";
import useJobData from "../hooks/useJobData";
import GlitchText from "./GlitchText";
import useHomeContext from "../hooks/useHomeContext";

const JobTime: FC<IJobDates> = ({ index }: IJobDates) => {
  const { t } = useTranslation();
  const { themeMode } = useHomeContext();
  const { from, to } = useJobData(index);

  return (
    <div id={css.jobTime} data-mode={themeMode}>
      <div className={css.title}>
        <span>{t("from")}</span>
      </div>
      <div>
        <GlitchText text={t(from)} />
      </div>
      <div className={css.title}>
        <span>{t("to")}</span>
      </div>
      <div>
        <GlitchText text={t(to)} />
      </div>
    </div>
  );
};

export default JobTime;
