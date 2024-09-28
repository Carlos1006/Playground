import { FC } from "react";
import Header from "./components/header";
import Visor from "./components/visor";
import css from "./styles/home.module.scss";
import "./styles/globals.scss";

const Web_11: FC = () => {
  return (
    <>
      <div id={css.main}>
        <Header />
        <div id={css.decorator} />
        <Visor />
      </div>
    </>
  );
};

export default Web_11;
