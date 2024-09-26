import { FC } from "react";
import css from "../styles/page.module.scss";
import AudioFrequecies from "../components/audioFreqs";

const Page_19: FC = () => {
  return (
    <div className={`${css.page} ${css.black} ${css.relative}`}>
      <AudioFrequecies />
    </div>
  );
};

export default Page_19;
