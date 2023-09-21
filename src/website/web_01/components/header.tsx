import css from './../style/header.module.scss';
import imgLogo from './../assets/logo.svg';
import { FiSearch } from 'react-icons/fi';

const Header = ()=> {
    return (<>
        <div className={css.header}>
            <div className={css.headerMargin}>
                <div id={css.logo}>
                    <img src={imgLogo} alt="Logo" />
                </div>
                <div id={css.name}>
                    <span>Website</span>
                </div>
                <div className={`${css.link}`}><span>Tours</span></div>
                <div className={`${css.link}`}><span>About us</span></div>
                <div className={`${css.link}`}><span>Gallery</span></div>
                <div className={`${css.link}`}><span>Blog</span></div>
                <div className={`${css.link}`}><span>Contacts</span></div>
                <div className={`${css.link} ${css.search}`}>
                    <span>Search</span>
                    <FiSearch />
                </div>
                <button id={css.button}>
                    <span>Get started</span>
                </button>
            </div>
        </div>
    </>)
}

export default Header;