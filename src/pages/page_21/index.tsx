import { FC } from "react";
import css from "../../styles/page.module.scss";
import HeatMap from "../../components/heatmap";

const Page_20: FC = () => {
  return (
    <div className={`${css.page} ${css.black} ${css.relative}`}>
      <HeatMap />
    </div>
  );
};

export default Page_20;
