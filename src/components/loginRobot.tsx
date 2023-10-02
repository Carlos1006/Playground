import React from 'react';
import css from '../styles/loginRobot.module.scss';
import {FaUserAlt} from 'react-icons/fa';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';

const Teeth = 5;

const Robot: React.FC = () => {

    return (
        <div id={css.robot}>
            <div className={css.body}>
                <div className={css.face}>
                    <div className={css.eyesContainer}>
                        <div className={`${css.eye} ${css.left}`}>
                            <div className={css.eyeBright} />
                        </div>
                        <div className={`${css.eye} ${css.right}`}>
                            <div className={css.eyeBright} />
                        </div>
                    </div>
                    <div className={css.mouth}>
                        {Array(Teeth).fill(0).map((_, i) => <div key={i} className={css.tooth} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

const LoginRobot: React.FC = () => {

    const [eye, setEye] = React.useState<boolean>(false);

    return (
        <div id={css.loginRobot}>
            <div id={css.robotContainer}>
                <Robot />
            </div>
            <div className={css.input}>
                <input placeholder='User...'/>
                <div className={css.icon}>
                    <FaUserAlt />
                </div>
            </div>
            <div className={css.input}>
                <input placeholder='Password...' type={eye ? 'text' : 'password'}/>
                <div className={`${css.icon} ${css.eye}`}>
                    {eye ? <AiFillEyeInvisible onClick={() => setEye(!eye)}/> : <AiFillEye onClick={() => setEye(!eye)}/>}
                </div>
            </div>
            <button id={css.submit}>
                <span>Ready</span>
            </button>
        </div>
    );
};

export default LoginRobot;
