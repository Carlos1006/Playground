import { FC, useEffect, useRef, useState } from "react";
import css from "../styles/showCase.module.scss";
import DayNightToggle from "../../../components/daynightToggle_01";
import GlitchText from "./GlitchText";
import Loader from "./Loader";
import ShowCaseCanvas from "./ShowCaseCanvas";
import If from "./If";

const ShowCase: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div id={css.showCase} ref={ref}>
      <If condition={loading} id={css.loaderContainer}>
        <Loader className={css.loader} />
      </If>

      <If condition={!loading} id={css.glass}>
        <DayNightToggle />
      </If>

      <div id={css.currentComponent}>
        <If condition={!loading}>
          <GlitchText text="Day/Night Toggle" />
        </If>
      </div>
      <ShowCaseCanvas />
    </div>
  );
};

export default ShowCase;
