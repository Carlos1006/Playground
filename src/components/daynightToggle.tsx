import css from '../styles/daynightToggle.module.scss';

const Cloud = () => {
    return <>
        <div className={css.cloud}>

        </div>
    </>
}

const DayNightToggle = () => {

    return <>
        <div className={css.toggle}>
            <div className={css.circle}>
                <div className={css.center}/>
            </div>
        </div>
    </>
}

export default DayNightToggle;