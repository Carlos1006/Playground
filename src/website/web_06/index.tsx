import { FC } from "react";
import Banner from "./components/banner";
import css from "./styles/main.module.scss";
import Header from "./components/header";

const Web_06: FC = () => {
  return (
    <div id={css.main}>
      <Banner>
        <Header />
      </Banner>
    </div>
  );
};

export default Web_06;
