import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import SocialMedia from "./SocialMedia";
import Name from "./Name";
import Mode from "./Mode";
import useHomeContext from "../hooks/useHomeContext";

const Header: FC = () => {
  const { themeMode } = useHomeContext();

  return (
    <>
      <div
        data-slot="h1000-00"
        data-mode={themeMode}
        className={globalCss.slot}
      />
      <div
        data-slot="h2000-00"
        data-mode={themeMode}
        className={globalCss.slot}
      >
        <Mode />
      </div>
      <div
        data-slot="h3000-00"
        data-mode={themeMode}
        className={globalCss.slot}
      >
        <Name />
      </div>
      <div
        data-slot="h4000-00"
        data-mode={themeMode}
        className={globalCss.slot}
      >
        <SocialMedia />
      </div>
    </>
  );
};

export default Header;
