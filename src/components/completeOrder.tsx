import { useState } from "react";
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

    const animationStart = async () => {
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
    }

    const animationEnd = async() => {
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
    }

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
        animationEnd
    }
}

const CompleteOrder = () => {

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
        animationEnd
    } = useAnimation();

    const [completed, setCompleted] = useState(false); 
    const [text, setText] = useState("Complete Order");

    const onClick = async ()=> {
        animationStart();
        const response = await emulateResponse();
        setText(response? "Order Placed" : "Error");
        setCompleted(response);
        animationEnd();
    }

    return <>
        <div
        onClick={onClick}
        className={`
            ${css.completeOrder}
            ${small? css.small : ""}
            ${removeBorderRadius? css.removeBorderRadius : ""}
            ${disappear? css.disappear : ""}
            ${overflow? css.overflow : ""}
            ${packageBox? css.package : ""}
            ${packageRight? css.packageRight : ""}
            ${truckFirstStage? css.truckFirstStage : ""}
            ${loadBar? css.loadBar : ""}

            ${fillBar? css.fillBar : ""}
            ${truckLastStage? css.truckLastStage : ""}
            ${fillCheckmark? css.fillCheckmark : ""}
        `}>
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
                            <div className={css.cargoShadow}/>
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
                    {completed && <>
                        <div className={css.checkMark}>
                            <div>
                                <div/>
                            </div>
                            <div>
                                <div/>
                            </div>
                        </div>
                    </>}
                </span>
            </div>
        </div>
    </>
}

export default CompleteOrder;