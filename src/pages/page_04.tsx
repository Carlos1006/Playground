import { FC } from "react";
import GlowButton from "../components/glowButton";
import css from "../styles/page.module.scss";

const Page_03: FC = () => {
  return (
    <div className={`${css.component} ${css.dark}`}>
      <GlowButton />
    </div>
  );
};

export default Page_03;
