import React, { FC } from "react";
import css from "../styles/template.module.scss";
import Menu from "./menu";
import Header from "./header";
import Navigator from "./navigator";

interface TemplateProps {
  children: React.ReactNode;
}

const Template: FC<TemplateProps> = ({ children }: TemplateProps) => {
  return (
    <div id={css.template}>
      <Menu />
      <div id={css.main}>
        <div id={css.mainContainer}>
          <Header />
          {children}
          <Navigator />
        </div>
      </div>
    </div>
  );
};

export default Template;
