import { FC } from 'react';
import { BodyProps } from '../types';
import css from './../style/body.module.scss';

const Body:FC<BodyProps> = ({children}: BodyProps)=> {
    return (<>
        <div className={css.body}>
            <div className={css.bodyMargin}>
                {children}
            </div>
        </div>
    </>)
}

export default Body;