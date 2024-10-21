import { FC } from "react";
import css from "../styles/oldMenuSlot.module.scss";
import useHomeContext from "../hooks/useHomeContext";
import { MODE } from "../constants";

const OldMenuSlot: FC = () => {
  const { themeMode } = useHomeContext();

  if (themeMode !== MODE.OLD) {
    return null;
  }
  return (
    <>
      <div className={css.leftShadow} />
      <div className={css.topShadow} />
      <div className={css.rightShadow} />
      <div className={css.bottomShadow} />
    </>
  );
};

export default OldMenuSlot;
