import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import SocialMedia from "./SocialMedia";
import Name from "./Name";
import Mode from "./Mode";

const Header: FC = () => {
  return (
    <>
      <div data-slot="h1000-00" className={globalCss.slot} />
      <div data-slot="h2000-00" className={globalCss.slot}>
        <Mode />
      </div>
      <div data-slot="h3000-00" className={globalCss.slot}>
        <Name />
      </div>
      <div data-slot="h4000-00" className={globalCss.slot}>
        <SocialMedia />
      </div>
    </>
  );
};

export default Header;
