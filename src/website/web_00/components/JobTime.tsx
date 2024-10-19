import { FC } from "react";
import css from "../styles/skills.module.scss";
import { IJobDates } from "../types";
import useJobData from "../hooks/useJobData";
import GlitchText from "./GlitchText";
import useHomeContext from "../hooks/useHomeContext";

const JobTime: FC<IJobDates> = ({ index }: IJobDates) => {
  const { themeMode } = useHomeContext();
  const { from, to } = useJobData(index);

  return (
    <div id={css.jobTime} data-mode={themeMode}>
      <div className={css.title}>
        <span>From</span>
      </div>
      <div>
        <GlitchText text={from} />
      </div>
      <div className={css.title}>
        <span>To</span>
      </div>
      <div>
        <GlitchText text={to} />
      </div>
    </div>
  );
};

export default JobTime;
