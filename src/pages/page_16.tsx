import { FC } from "react";
import BarGraph3D from "../components/3dBarGraph";
import css from "../styles/page.module.scss";

const Page_13: FC = () => {
  return (
    <>
      <div className={`${css.page} ${css.black} ${css.relative}`}>
        <BarGraph3D />
      </div>
    </>
  );
};

export default Page_13;
