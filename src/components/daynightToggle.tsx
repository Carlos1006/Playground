import { useState, FC } from 'react';
import css from '../styles/daynightToggle.module.scss';

interface ICloud {
    extra?: string;
}

const Cloud:FC<ICloud> = ({extra}:ICloud) => {
    return <>
        <div className={`${css.clouds} ${extra}`}>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    </>
}

const Stars:FC<ICloud> = ({extra}:ICloud) => {
    return <>
        <div className={`${css.stars} ${extra}`}>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
        </div>    
    </>
}

const DayNightToggle = () => {

    const [isDay, setIsDay] = useState(true);

    const toggleDayNight = () => {
        setIsDay(prev=>!prev);
    }

    return <>
        <div className={`
            ${css.toggle}
            ${isDay ? css.day : css.night}
        `} onClick={toggleDayNight}>
            <div className={css.circle}>
                <div className={css.moon}>
                    <div className={css.crater}/>
                    <div className={css.crater}/>
                    <div className={css.crater}/>
                </div>
                <div className={css.sun}/>
            </div>
            <div className={`${css.smallAura} ${css.circle}`}/>
            <div className={`${css.middleAura} ${css.circle}`}/>
            <div className={`${css.bigAura} ${css.circle}`}/>
            <div className={css.background}/>
            <Stars extra={css.nightStar}/>
            <Cloud extra={css.foregroundClouds}/>
            <Cloud extra={css.backgroundClouds}/>
        </div>
    </>
}

export default DayNightToggle;