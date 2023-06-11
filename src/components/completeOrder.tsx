import { useState } from "react";
import css from "../styles/completeOrder.module.scss";

const CompleteOrder = () => {

    const [small, setSmall] = useState(false);
    const [disappear, setDisappear] = useState(false);

    const onClick = ()=> {
        setSmall(true);
        setTimeout(()=>{ 
            setDisappear(true);
        },500);
    }

    return <>
        <div
        onClick={onClick}
        className={`
            ${css.completeOrder}
            ${small? css.small : ""}
            ${disappear? css.disappear : ""}
        `}>
            <div className={css.carContainer}>
                <div className={css.car}>
                    <div className={css.cargoBox}></div>
                    <div className={css.rightWheels}></div>
                    <div className={css.leftWheels}></div>
                    <div className={css.cabin}></div>
                    <div className={css.chassis}></div>
                </div>
            </div>
            <div className={css.road}></div>
            <div className={css.background}></div>
        </div>
    </>
}

export default CompleteOrder;