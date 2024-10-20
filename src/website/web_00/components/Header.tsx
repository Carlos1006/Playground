import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import SocialMedia from "./SocialMedia";
import Name from "./Name";
import Mode from "./Mode";
import useHomeContext from "../hooks/useHomeContext";
import css from "../styles/header.module.scss";

const Header: FC = () => {
  const { themeMode } = useHomeContext();

  return (
    <>
      <div
        id={css.headerMenu}
        data-slot="h1000-00"
        data-mode={themeMode}
        className={`${globalCss.slot} ${css.headerItem}`}
      />
      <div
        id={css.headerMode}
        data-slot="h2000-00"
        data-mode={themeMode}
        className={`${globalCss.slot} ${css.headerItem}`}
      >
        <Mode />
      </div>
      <div
        id={css.headerName}
        data-slot="h3000-00"
        data-mode={themeMode}
        className={`${globalCss.slot} ${css.headerItem}`}
      >
        <Name />
      </div>
      <div
        id={css.headerSocialMedia}
        data-slot="h4000-00"
        data-mode={themeMode}
        className={`${globalCss.slot} ${css.headerItem}`}
      >
        <SocialMedia />
      </div>
    </>
  );
};

export default Header;
