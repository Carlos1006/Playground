import { FC, useEffect, useState } from "react";
import css from "../styles/main.module.scss";
import { IHeader } from "../types";

const Header: FC<IHeader> = ({ onDarkModeToggle }: IHeader) => {
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    setShowHeader(false);
  }, []);

  return (
    <div id={css.navBar} className={showHeader ? css.hiddenHeader : ""}>
      <div id={css.navbarLogo} />
      <div className={css.navLink}>
        <span>Estudios</span>
        <div className={css.underLink}>
          <div />
          <div />
        </div>
      </div>
      <div className={css.navLink}>
        <span>Experiencia</span>
        <div className={css.underLink}>
          <div />
          <div />
        </div>
      </div>
      <div className={css.navLink}>
        <span>Proyectos</span>
        <div className={css.underLink}>
          <div />
          <div />
        </div>
      </div>
      <div className={css.navLink}>
        <span>Contacto</span>
        <div className={css.underLink}>
          <div />
          <div />
        </div>
      </div>
      <div onClick={onDarkModeToggle} id={css.darkMode}>
        <svg id={css.darkmodeIcon} viewBox="0 0 100 100">
          <path d="M50,2.5A47.5,47.5,0,1,0,97.5,50,47.5,47.5,0,0,0,50,2.5Zm.44,82.57a35.52,35.52,0,0,1,0-71Z" />
        </svg>
        <div className={css.underLink}>
          <div />
          <div />
        </div>
      </div>
    </div>
  );
};

export default Header;
