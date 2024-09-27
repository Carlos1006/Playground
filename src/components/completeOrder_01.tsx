import { FC, useState } from "react";
import css from "../styles/completeOrder_01.module.scss";
import { AnimationTools } from "../types/completeOrder_01";
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

  const [fillBarError, setFillBarError] = useState(false);
  const [wheelError, setWheelError] = useState(false);
  const [motorError, setMotorError] = useState(false);
  const [fillErrormark, setFillErrormark] = useState(false);

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

  const animationError = async (): Promise<void> => {
    setLoadBar(false);
    setFillBarError(true);
    setWheelError(true);
    await sleep(200);
    setMotorError(true);
    await sleep(1300);
    setOverflow(false);
    setDisappear(false);
    await sleep(400);
    setRemoveBorderRadius(false);
    setSmall(false);
    await sleep(100);
    setFillErrormark(true);
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
    fillBarError,
    wheelError,
    motorError,
    fillErrormark,
    animationError,
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
    fillBarError,
    wheelError,
    motorError,
    fillErrormark,
    animationError,
  } = useAnimation();

  const [completed, setCompleted] = useState(false);
  const [text, setText] = useState("Complete Order");

  const onClick = async (): Promise<void> => {
    animationStart();
    const response = await emulateResponse();
    setText(response ? "Error Occured" : "Order Placed");
    setCompleted(response);
    animationError();
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

            ${fillBarError ? css.fillBarError : ""}
            ${wheelError ? css.wheelError : ""}
            ${motorError ? css.motorError : ""}
            ${fillErrormark ? css.fillErrormark : ""}
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
              <div className={css.smokeTrail}>
                {new Array(6).fill(0).map((_, index) => {
                  return (
                    <div className={css.smoke} data-index={index} key={index} />
                  );
                })}
              </div>
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
                <div className={css.error}>
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
