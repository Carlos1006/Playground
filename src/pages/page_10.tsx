import { FC } from "react";
import LoginRobot from "../components/loginRobot";
import css from "../styles/page.module.scss";

const Page_09: FC = () => {
  return (
    <div className={`${css.page} ${css.flex}`}>
      <LoginRobot />
    </div>
  );
};

export default Page_09;
