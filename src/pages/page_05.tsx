import { FC } from "react";
import SusbcribeButton from "../components/subscribeButton";
import css from "../styles/page.module.scss";

const Page_03: FC = () => {
  return (
    <div className={`${css.component}`}>
      <SusbcribeButton />
    </div>
  );
};

export default Page_03;
