import { FC } from "react";
import Robot0 from "../components/robot";
import css from "../styles/page.module.scss";

const Page_06: FC = () => {
  return (
    <div className={`${css.component}`}>
      <Robot0 size={"20vw"} coords={["2vw", "2vw"]} />
      <Robot0 size={"10vw"} coords={["23vw", "6.5vw"]} />
      <Robot0 size={"5vw"} coords={["34vw", "8.5vw"]} />
    </div>
  );
};

export default Page_06;
