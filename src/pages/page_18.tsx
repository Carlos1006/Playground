import { FC } from "react";
import css from "../styles/page.module.scss";
import AudioSphere from "../components/audioSphere";

const Page_18: FC = () => {
  return (
    <div className={`${css.page} ${css.black} ${css.relative}`}>
      <AudioSphere />
    </div>
  );
};

export default Page_18;
