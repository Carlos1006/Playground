import React, { FC, useEffect, useState } from "react";
import css from "../styles/banner.module.scss";

interface IBanner {
  children: React.ReactNode;
}

const Banner: FC<IBanner> = ({ children }: IBanner) => {
  const [step, setStep] = useState(0);
  const lastStep = 3;

  const [blockStep, setBlockStep] = useState(0);
  const [circleStep, setCircleStep] = useState(0);

  const myName = "Carlos Daniel";
  const myLast = "Gonzalez Lopez";

  const myDescription1 = "Lic. en Multimedia y Animacion Digital";
  const myDescription0 = "Desarrollador FrontEnd";

  const animation = (_value: number) => {
    if (_value <= lastStep) {
      setTimeout(() => {
        setStep(_value);
        if (_value === 2) {
          setBlockStep(1);
        }
        animation(_value + 1);
      }, 350);
    }
  };

  useEffect(() => {
    setCircleStep(1);
    animation(step);
  }, []);

  return (
    <div id={css.banner}>
      {children}
      <div className={css.bannerBackground}>
        <div className={css.square} />
        <div className={css.canvas}>
          <div data-step={step} className={css.figure} id={css.square0} />
          <div data-step={step} className={css.figure} id={css.square1} />
          <div data-step={step} className={css.figure} id={css.square2} />
          <div data-step={blockStep} className={css.block} id={css.block0} />
          <div data-step={blockStep} className={css.block} id={css.block1} />
          <div data-step={blockStep} className={css.block} id={css.block2} />
          <div data-step={blockStep} className={css.block} id={css.block3} />
          <div data-step={blockStep} className={css.block} id={css.block4} />
          {/*<div className={css.circle} id={css.circle0}/>*/}
          <div data-step={circleStep} className={css.circle} id={css.circle1} />
          <div data-step={circleStep} className={css.circle} id={css.circle2} />
          <div data-step={circleStep} className={css.circle} id={css.circle3} />
        </div>
      </div>
      <div className={css.bannerInfo}>
        <h2>
          {myName} <br /> {myLast}
        </h2>
        <p>
          {myDescription0}
          <br /> {myDescription1}
        </p>
        <div className={css.actionLine}>
          <button>ACERCA DE MI</button>
          <button>CONTACTO</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
