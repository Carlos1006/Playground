import { FC, useEffect } from "react";
import css from "../../styles/page.module.scss";
import HeatMap from "../../components/heatmap";

const Page_20: FC = () => {
  useEffect(() => {
    document.title = "Page 20 - Heatmap";
  }, []);

  return (
    <div className={`${css.page} ${css.black} `}>
      <HeatMap />
    </div>
  );
};

export default Page_20;
