import { FC, FocusEvent, MouseEvent, useEffect, useRef, useState } from "react";
import css from "./../styles/subscribeButton.module.scss";
import { sleep } from "../utils";
import { Coordinates } from "../types/general";

const SusbcribeButton: FC = () => {

    const [invisibleText, setInvisibleText] = useState<boolean>(false);
    const [hideText, setHideText] = useState<boolean>(false); 
    const [big, setBig] = useState<boolean>(false);
    const [showIcon, setShowIcon] = useState<boolean>(false); 
    const [showInput, setShowInput] = useState<boolean>(false);
    const [showArrowAngles, setShowArrowAngles] = useState<boolean>(false);
    const [visibleText2, setVisibleText2] = useState<boolean>(false);
    const [showText2, setShowText2] = useState<boolean>(false);

    const subscribeButton = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState<Coordinates>({x:0, y:0});
    const [offset, setOffset] = useState<Coordinates>({x:0, y:0});
    const [propagate, setPropagate] = useState<boolean>(false);
    const [showEffect, setShowEffect] = useState<boolean>(false);
    const [canClick, setCanClick] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    const showClickEffect = async (x: number, y:number): Promise<void> => {
        setPosition({
            x: x-offset.x,
            y: y-offset.y
        });
        setPropagate(true);
        setShowEffect(true);
        await sleep(200);
        setPropagate(false);
        setShowEffect(false);
    }

    const onClick = async (e:MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        if (canClick) return;
        await showClickEffect(e.clientX, e.clientY);
        setInvisibleText(true);
        await sleep(200);
        setHideText(true);
        setBig(true);
        setShowIcon(true);
        await sleep(500);
        setShowArrowAngles(true);
        setShowInput(true);
        await sleep(400);
        setCanClick(true);

        resetOffset();
    };

    const onFocus = async (e:FocusEvent<HTMLInputElement, Element>) => {
        console.log(e);
    };

    const reset = () => {
        setInvisibleText(false);
        setHideText(false);
        setBig(false);
        setShowIcon(false);
        setShowInput(false);
        setShowArrowAngles(false);
        setCanClick(false);
    }

    const onSubscribe = async (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        if (!canClick) return;
        await showClickEffect(e.clientX, e.clientY);
        setShowInput(false);
        await sleep(300);
        setInputValue("");
        setShowIcon(false);
        await sleep(200);
        setBig(false);
        await sleep(400);
        setShowText2(true);
        await sleep(200);
        setVisibleText2(true);
        // return original text
        await sleep(3000);
        setVisibleText2(false);
        setInvisibleText(false);
        await sleep(300);
        setShowText2(false);
        setHideText(false);
        reset();
        resetOffset();
    }

    const resetOffset = () => {
        if(subscribeButton.current) {
            const {x, y}: Coordinates = subscribeButton.current.getBoundingClientRect();
            setOffset({x, y});
        }
    }

    useEffect(() => {
        if(!subscribeButton.current) return;
        resetOffset();
    }, [subscribeButton]);

    return <>
        <div 
            ref={subscribeButton}
            onClick={(e)=>onClick(e)}
            className={`
                ${invisibleText? css.invisibleText : ""}
                ${hideText? css.hideText : ""}
                ${big? css.big : ""}
                ${showIcon? css.showIcon : ""}
                ${showInput? css.showInput : ""}
                ${showArrowAngles? css.showArrowAngles : ""}
                ${showText2? css.showText2 : ""}
                ${visibleText2? css.visibleText2 : ""}
                ${css.susbcribeButton}
        `}>
            <div 
                style={{
                    left: position.x,
                    top: position.y
                }}
                className={`
                    ${css.clickAnimation}
                    ${propagate? css.propagate : ""}
                    ${showEffect? css.showEffect : ""}
                `}
            />
            <div className={css.solid} onClick={(e)=>onSubscribe(e)}>
                <span>SUBSCRIBE</span>
                <span className={css.text2}>THANK YOU</span>
                <div className={css.iconContainer}>
                    <div className={css.arrow}>
                        <div className={`${css.arrowAngleUp} ${css.arrowAngle}`}></div>
                        <div className={`${css.arrowAngleDown} ${css.arrowAngle}`}></div>
                    </div>
                </div>
            </div>
            <input type="text" placeholder="E-mail" onChange={(e)=>setInputValue(e.target.value)} value={inputValue} className={css.input} onFocus={(e)=>onFocus(e)} />
        </div>
    </>
};

export default SusbcribeButton;