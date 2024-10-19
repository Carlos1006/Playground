import { CSSProperties, FC } from "react";
import css from "../styles/skills.module.scss";
import { ISkillBar } from "../types";
import useSkillData from "../hooks/useSkillData";
import useHomeContext from "../hooks/useHomeContext";

const SkillBar: FC<ISkillBar> = ({ index }: ISkillBar) => {
  const { themeMode } = useHomeContext();
  const { level, color } = useSkillData(index);

  return (
    <div
      id={css.skillBar}
      className={level === 11 ? css.isEleven : ""}
      data-mode={themeMode}
    >
      {Array.from({ length: 10 }, (_, index) => {
        const style: CSSProperties = {
          "--delay": `${index * 0.1}s`,
          "--color": color,
          "--shadow": `${color}${Number(100).toString(16)}`,
        } as CSSProperties;
        const isActive = index + 1 <= level;
        return (
          <div
            style={style}
            key={index}
            className={`${css.milestone} ${isActive ? css.active : ""}`}
          />
        );
      })}
    </div>
  );
};

export default SkillBar;
