import { FC, useEffect, useRef, useState } from "react";
import css from "../styles/showCase.module.scss";
import GlitchText from "./GlitchText";
import Loader from "./Loader";
import ShowCaseCanvas from "./ShowCaseCanvas";

import {
  MdOutlineArrowBackIosNew as ArrowLeft,
  MdArrowForwardIos as ArrowRight,
} from "react-icons/md";

import DivIf from "./DivIf";
import useHomeContext from "../hooks/useHomeContext";
import ShowCaseControl from "./ShowCaseControl";
import { MODE } from "../constants";
import {
  EMPTY_COMPONENT,
  SHOWCASE_COMPONENTS,
  SHOWCASE_COMPONENTS_ARRAY,
} from "../helpers/showCase";
import { IShowCaseComponent, ShowCaseComponent } from "../types";

const ShowCase: FC = () => {
  const { themeMode } = useHomeContext();
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [title, setTitle] = useState<string>("");
  const [componentIndex, setComponentIndex] = useState<number>(17);
  const [currentShowCaseComponent, setCurrentShowCaseComponent] =
    useState<IShowCaseComponent | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentKey: ShowCaseComponent =
        SHOWCASE_COMPONENTS_ARRAY[componentIndex];
      const newComponent = SHOWCASE_COMPONENTS[currentKey];
      setCurrentShowCaseComponent(newComponent);
      setTitle(newComponent.title);
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [componentIndex]);

  const nextComponent = (): void => {
    let newComponentIndex = componentIndex + 1;
    setLoading(true);
    if (newComponentIndex >= SHOWCASE_COMPONENTS_ARRAY.length) {
      newComponentIndex = 0;
    }
    const newTitle =
      SHOWCASE_COMPONENTS[SHOWCASE_COMPONENTS_ARRAY[newComponentIndex]].title;
    setTitle(newTitle);
    setComponentIndex(newComponentIndex);
  };

  const prevComponent = (): void => {
    let newComponentIndex = componentIndex - 1;
    setLoading(true);
    if (newComponentIndex < 0) {
      newComponentIndex = SHOWCASE_COMPONENTS_ARRAY.length - 1;
    }
    const newTitle =
      SHOWCASE_COMPONENTS[SHOWCASE_COMPONENTS_ARRAY[newComponentIndex]].title;
    setTitle(newTitle);
    setComponentIndex(newComponentIndex);
  };

  const toLastComponent = (): void => {
    if (componentIndex === SHOWCASE_COMPONENTS_ARRAY.length - 1) return;
    setLoading(true);
    const newComponentIndex = SHOWCASE_COMPONENTS_ARRAY.length - 1;
    const newTitle =
      SHOWCASE_COMPONENTS[SHOWCASE_COMPONENTS_ARRAY[newComponentIndex]].title;
    setTitle(newTitle);
    setComponentIndex(newComponentIndex);
  };

  const toFirstComponent = (): void => {
    if (componentIndex === 0) return;
    setLoading(true);
    const newComponentIndex = 0;
    const newTitle =
      SHOWCASE_COMPONENTS[SHOWCASE_COMPONENTS_ARRAY[newComponentIndex]].title;
    setTitle(newTitle);
    setComponentIndex(newComponentIndex);
  };

  const onIndexChange = (index: number): void => {
    if (index === componentIndex) return;
    setLoading(true);
    const newTitle =
      SHOWCASE_COMPONENTS[SHOWCASE_COMPONENTS_ARRAY[index]].title;
    setTitle(newTitle);
    setComponentIndex(index);
  };

  const { component: Component, props } =
    currentShowCaseComponent ?? EMPTY_COMPONENT;

  return (
    <div id={css.showCase} ref={ref} data-mode={themeMode}>
      <DivIf
        condition={loading || !currentShowCaseComponent}
        id={css.loaderContainer}
      >
        <Loader className={css.loader} />
      </DivIf>

      {themeMode != MODE.OLD && (
        <>
          <div
            data-direction="left"
            className={css.control}
            onClick={prevComponent}
            aria-label="Previous"
            aria-roledescription="button"
          >
            <ArrowLeft />
          </div>
          <div
            data-direction="right"
            className={css.control}
            onClick={nextComponent}
            aria-label="Next"
            aria-roledescription="button"
          >
            <ArrowRight />
          </div>
        </>
      )}

      <DivIf condition={!loading} id={css.glass} themeMode={themeMode}>
        <Component {...props} />
      </DivIf>

      {themeMode != MODE.OLD && (
        <>
          <div id={css.currentComponent}>
            <GlitchText text={title} />
          </div>
          <ShowCaseCanvas />
        </>
      )}
      {themeMode === MODE.OLD && (
        <ShowCaseControl
          disableFastBackward={componentIndex === 0}
          disableFastForward={
            componentIndex === SHOWCASE_COMPONENTS_ARRAY.length - 1
          }
          componentLength={SHOWCASE_COMPONENTS_ARRAY.length}
          index={componentIndex}
          onRangeChange={onIndexChange}
          onBackward={prevComponent}
          onForward={nextComponent}
          onFastBackward={toFirstComponent}
          onFastForward={toLastComponent}
          title={title}
        />
      )}
    </div>
  );
};

export default ShowCase;
