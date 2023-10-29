import Header from "./components/header";
import Visor from "./components/visor";
import css from "./styles/Home.module.scss";
import "./styles/globals.scss";

const Web_11 = () => {
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
