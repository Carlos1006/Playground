import { FC } from "react";
import css from "../styles/page.module.scss";
import Rocket from "../components/rocket";

const Page_20: FC = () => {
  return (
    <div className={`${css.page} ${css.black} ${css.relative}`}>
      <Rocket />
    </div>
  );
};

export default Page_20;
