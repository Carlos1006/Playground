import { FC } from "react";
import css from "../styles/skills.module.scss";
import { ISkillIcon } from "../types";
import useHomeContext from "../hooks/useHomeContext";
import folderIcon from "../assets/folder2.png";
import { MODE } from "../constants";

const SkillIcon: FC<ISkillIcon> = ({ children, selected }: ISkillIcon) => {
  const { themeMode } = useHomeContext();

  return (
    <div
      data-mode={themeMode}
      className={`
        ${css.skillIcon} 
        ${selected ? css.selected : css.notSelected}
      `}
    >
      {themeMode === MODE.OLD && <img src={folderIcon} alt="Folder Icon" />}
      {children}
    </div>
  );
};

export default SkillIcon;
