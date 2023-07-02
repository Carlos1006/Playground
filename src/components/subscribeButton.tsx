import { FC, useState } from "react";
import css from "./../styles/subscribeButton.module.scss";
import { sleep } from "../utils";

const SusbcribeButton: FC = () => {

    const [hideText, setHideText] = useState(false); 
    const [big, setBig] = useState(false);
    const [showInput, setShowInput] = useState(false);

    const onClick = async () => {
        setHideText(true);
        await sleep(200);
        setBig(true);
        await sleep(500);
        setShowInput(true);
    };
    

    return <>
        <div 
        onClick={onClick}
        className={`
            ${hideText? css.hideText : ""}
            ${big? css.big : ""}
            ${showInput? css.showInput : ""}
            ${css.susbcribeButton}
        `}>
            <div className={css.solid}>
                <span>SUBSCRIBE</span>
            </div>
            <input type="text" placeholder="E-mail" className={css.input} />
        </div>
    </>
};

export default SusbcribeButton;