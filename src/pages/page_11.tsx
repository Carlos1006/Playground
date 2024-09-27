import { FC } from "react";
import Grid from "../components/3dGridBigger";
import css from "../styles/page.module.scss";

const Page_11: FC = () => {
  return (
    <div className={`${css.page} ${css.darker} ${css.flex}`}>
      <Grid />
    </div>
  );
};

export default Page_11;
