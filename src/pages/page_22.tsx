import { FC } from "react";
import css from "../styles/page.module.scss";
import GlobeCanvasMonochromatic from "../components/globeChart";

const Page_21: FC = () => {
  return (
    <div className={`${css.page} ${css.black} ${css.relative}`}>
      <GlobeCanvasMonochromatic />
    </div>
  );
};

export default Page_21;
