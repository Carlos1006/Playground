import { FC, useState } from "react";
import css from "../styles/completeOrder.module.scss";
import { AnimationTools } from "../types/completeOrder";
import { emulateResponse, sleep } from "../utils";

function useAnimation(): AnimationTools {
  const [small, setSmall] = useState(false);
  const [removeBorderRadius, setRemoveBorderRadius] = useState(false);
  const [disappear, setDisappear] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const [packageBox, setPackageBox] = useState(false);
  const [packageRight, setPackageRight] = useState(false);
  const [truckFirstStage, setTruckFirstStage] = useState(false);
  const [loadBar, setLoadBar] = useState(false);

  const [fillBar, setFillBar] = useState(false);
  const [truckLastStage, setTruckLastStage] = useState(false);
  const [fillCheckmark, setFillCheckmark] = useState(false);

  const [killTransition, setKillTransition] = useState(false);

  const animationStart = async (): Promise<void> => {
    setSmall(true);
    await sleep(500);
    setRemoveBorderRadius(true);
    setDisappear(true);
    await sleep(400);
    setOverflow(true);
    await sleep(5);
    setPackageBox(true);
    await sleep(50);
    setPackageRight(true);
    await sleep(500);
    setTruckFirstStage(true);
    await sleep(300);
    setLoadBar(true);
  };

  const animationEnd = async (): Promise<void> => {
    setLoadBar(false);
    setFillBar(true);
    setTruckFirstStage(false);
    setTruckLastStage(true);
    await sleep(800);
    setOverflow(false);
    setDisappear(false);
    await sleep(400);
    setRemoveBorderRadius(false);
    setSmall(false);
    await sleep(100);
    setFillCheckmark(true);
    await sleep(3000);
    setKillTransition(true);
    restore();
  };

  const restore = (): void => {
    setSmall(false);
    setRemoveBorderRadius(false);
    setDisappear(false);
    setOverflow(false);
    setPackageBox(false);
    setPackageRight(false);
    setTruckFirstStage(false);
    setLoadBar(false);
    setFillBar(false);
    setTruckLastStage(false);
    setFillCheckmark(false);
    setKillTransition(false);
  };

  return {
    small,
    removeBorderRadius,
    disappear,
    overflow,
    packageBox,
    packageRight,
    truckFirstStage,
    loadBar,
    animationStart,
    fillBar,
    truckLastStage,
    fillCheckmark,
    animationEnd,
    killTransition,
  };
}

const CompleteOrder: FC = () => {
  const {
    small,
    removeBorderRadius,
    disappear,
    overflow,
    packageBox,
    packageRight,
    truckFirstStage,
    loadBar,
    animationStart,
    fillBar,
    truckLastStage,
    fillCheckmark,
    animationEnd,
    killTransition,
  } = useAnimation();

  const [completed, setCompleted] = useState(false);
  const [text, setText] = useState("Complete Order");

  const onClick = async (): Promise<void> => {
    animationStart();
    const response = await emulateResponse();
    setText(response ? "Order Placed" : "Error");
    setCompleted(response);
    animationEnd();
    await sleep(3000);
    setText("Complete Order");
    setCompleted(false);
  };

  return (
    <>
      <div
        onClick={onClick}
        className={`
            ${css.completeOrder}
            ${small ? css.small : ""}
            ${removeBorderRadius ? css.removeBorderRadius : ""}
            ${disappear ? css.disappear : ""}
            ${overflow ? css.overflow : ""}
            ${packageBox ? css.package : ""}
            ${packageRight ? css.packageRight : ""}
            ${truckFirstStage ? css.truckFirstStage : ""}
            ${loadBar ? css.loadBar : ""}

            ${fillBar ? css.fillBar : ""}
            ${truckLastStage ? css.truckLastStage : ""}
            ${fillCheckmark ? css.fillCheckmark : ""}

            ${killTransition ? css.killTransition : ""}
        `}
      >
        <div className={css.carContainer}>
          <div className={css.car}>
            <div className={css.cargoBox}>
              <div className={css.roofShadow}></div>
              <div className={css.package}>
                <div className={css.tape}></div>
              </div>
              <div className={css.outerside}></div>
            </div>
            <div className={css.rightWheels}>
              <div className={css.wheel}></div>
              <div className={css.wheel}></div>
            </div>
            <div className={css.leftWheels}>
              <div className={css.wheel}></div>
              <div className={css.wheel}></div>
            </div>
            <div className={css.cabin}>
              <div className={css.cabinBox}>
                <div className={css.cargoShadow} />
                <div className={css.window}>
                  <div className={css.windowShadow}></div>
                </div>
              </div>
              <div className={css.motor}>
                <div className={css.light}></div>
              </div>
            </div>
            <div className={css.chassis}></div>
          </div>
        </div>
        <div className={css.road}>
          <div className={css.load}></div>
        </div>
        <div className={css.background}>
          <span>
            {text}
            {completed && (
              <>
                <div className={css.checkMark}>
                  <div>
                    <div />
                  </div>
                  <div>
                    <div />
                  </div>
                </div>
              </>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default CompleteOrder;
