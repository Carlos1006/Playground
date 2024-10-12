import { FC } from "react";
import Bubble from "../components/bubble";
import css from "../styles/page.module.scss";

const Page_15: FC = () => {
  return (
    <div className={`${css.page} ${css.black} ${css.relative}`}>
      <Bubble
        side={"20vw"}
        x={"10vw"}
        y={"10vw"}
        center={[70, 60]}
        color={{
          glow: [173, 51, 235],
          innerColor: [47, 14, 64],
          outerColor: [73, 18, 205],
        }}
      />
      <Bubble
        side={"10vw"}
        x={"23vw"}
        y={"23vw"}
        center={[40, 30]}
        color={{
          glow: [51, 155, 235],
          innerColor: [51, 155, 235],
          outerColor: [18, 70, 205],
        }}
      />
      <Bubble
        side={"12vw"}
        x={"25vw"}
        y={"5vw"}
        center={[30, 40]}
        color={{
          glow: [53, 241, 176],
          innerColor: [26, 115, 64],
          outerColor: [53, 242, 135],
        }}
      />
    </div>
  );
};

export default Page_15;
