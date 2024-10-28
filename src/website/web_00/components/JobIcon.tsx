import { FC } from "react";
import css from "../styles/skills.module.scss";
import { IJonIcon } from "../types";
import useHomeContext from "../hooks/useHomeContext";
import { MODE } from "../constants";
import folderIcon from "../assets/folder2.png";

const JobIcon: FC<IJonIcon> = ({ src, selected }: IJonIcon) => {
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
      <img src={src} alt="Job Icon" />
    </div>
  );
};

export default JobIcon;
