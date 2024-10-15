import { FC, useEffect, useRef, useState } from "react";
import css from "../styles/showCase.module.scss";
import GlitchText from "./GlitchText";
import Loader from "./Loader";
import ShowCaseCanvas from "./ShowCaseCanvas";

import {
  MdOutlineArrowBackIosNew as ArrowLeft,
  MdArrowForwardIos as ArrowRight,
} from "react-icons/md";

import DayNightToggle from "../../../components/daynightToggle_01";
import DivIf from "./DivIf";
// import GlowButton from "../../../components/glowButton";
// import DeleteFile from "../../../components/deleteFile";
// import CompleteOrder from "../../../components/completeOrder";
// import CompleteOrder2 from "../../../components/completeOrder_01";
// import SusbcribeButton from "../../../components/subscribeButton";
// import AudioSphere from "../../../components/audioSphere";
// import AudioFrequecies from "../../../components/audioFreqs";
// import LoginRobot from "../../../components/loginRobot";
// import Rocket from "../../../components/rocket";
// import Page_16 from "../../../pages/page_16";
// import Page_15 from "../../../pages/page_15";
// import Page_08 from "../../../pages/page_08";

const ShowCase: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      setTitle("Day/Night Toggle");
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div id={css.showCase} ref={ref}>
      <DivIf condition={loading} id={css.loaderContainer}>
        <Loader className={css.loader} />
      </DivIf>

      <div data-direction="left" className={css.control}>
        <ArrowLeft />
      </div>
      <div data-direction="right" className={css.control}>
        <ArrowRight />
      </div>

      <DivIf condition={!loading} id={css.glass}>
        <DayNightToggle />
        {/* <GlowButton /> */}
        {/* <DeleteFile /> */}
        {/* <CompleteOrder /> */}
        {/* <CompleteOrder2 /> */}
        {/* <SusbcribeButton /> */}
        {/* <AudioSphere /> */}
        {/* <AudioFrequecies /> */}
        {/* <LoginRobot /> */}
        {/* <Rocket /> */}
        {/* <Page_16 /> */}
        {/* <Page_15 /> */}
        {/* <Page_08 /> */}
        {/* Grid */}
        {/* Terrain */}
      </DivIf>

      <div id={css.currentComponent}>
        <GlitchText text={title} />
      </div>
      <ShowCaseCanvas />
    </div>
  );
};

export default ShowCase;
