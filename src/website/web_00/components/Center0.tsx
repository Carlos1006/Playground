import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import ShowCase from "./ShowCase";
import css from "../styles/center0.module.scss";
import useHomeContext from "../hooks/useHomeContext";
import OldMenuSlot from "./OldMenuSlot";
import { MODE } from "../constants";
import { useTranslation } from "react-i18next";

const Center0: FC = () => {
  const { themeMode } = useHomeContext();
  const { t } = useTranslation();

  return (
    <div
      data-slot="c0000-00"
      data-mode={themeMode}
      id={css.center0}
      className={globalCss.slot}
    >
      <OldMenuSlot />
      {themeMode === MODE.OLD && <div id={css.oldShowCaseScreen} />}
      <div className={css.showCaseTitle}>
        <h1>{t("some_of_my_work")}</h1>
        {themeMode !== MODE.OLD && (
          // <p>Here are some of the personal projects I have worked on.</p>
          <p>{t("some_of_my_work_description")}</p>
        )}
      </div>
      <ShowCase />
    </div>
  );
};

export default Center0;
