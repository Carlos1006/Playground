import { FC } from "react";
import globalCss from "../styles/main.module.scss";

const Header: FC = () => {
  return (
    <>
      <div data-slot="h1000-00" className={globalCss.slot} />
      <div data-slot="h2000-00" className={globalCss.slot} />
      <div data-slot="h3000-00" className={globalCss.slot} />
      <div data-slot="h4000-00" className={globalCss.slot} />
    </>
  );
};

export default Header;
