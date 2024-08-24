import { FC } from "react";
import css from "../styles/main.module.scss";
import { RxTriangleDown as TriangleDownIcon } from "react-icons/rx";
import { IoSearch as SearchIcon } from "react-icons/io5";
import { GoLocation as LocationIcon } from "react-icons/go";
import { ImBooks as BooksIcon } from "react-icons/im";
import { HeaderProps } from "../types";
import { IoMdSunny as SunIcon, IoMdMoon as MoonIcon } from "react-icons/io";

const Header: FC<HeaderProps> = ({
  darkMode,
  onDarkModeChange,
}: HeaderProps) => {
  const handleDarkModeChange = (): void => {
    onDarkModeChange();
  };

  return (
    <div className={`${css.header} ${darkMode ? css.darkModeHeader : ""}`}>
      <div>
        <p>Cthulhu</p>
      </div>
      <div>
        <div className={css.headerLink}>
          <div className={css.connector} />
          <div className={css.hideConnector}></div>
          <div className={css.headerLinkContent}>
            <span>Home</span>
          </div>
        </div>
        <div className={`${css.headerLink} ${css.yellow}`}>
          <div className={css.connector} />
          <div className={css.hideConnector}></div>
          <div className={css.headerLinkContent}>
            <span>Collections</span>
            <TriangleDownIcon className={css.triangleIcon} />
          </div>
        </div>
        <div className={css.headerLink}>
          <div className={css.connector} />
          <div className={css.hideConnector}></div>
          <div className={css.headerLinkContent}>
            <span>About</span>
          </div>
        </div>
        <div className={css.headerLink}>
          <div className={css.connector} />
          <div className={css.hideConnector}></div>
          <div className={css.headerLinkContent}>
            <SearchIcon />
            <input placeholder="Search" />
          </div>
        </div>
        <div
          className={`${css.headerLink} ${css.yellowIcon}`}
          onClick={handleDarkModeChange}
        >
          <div className={css.headerLinkContent}>
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </div>
        </div>
      </div>
      <div>
        <div className={`${css.headerLink} ${css.yellowIcon}`}>
          <div className={css.connector} />
          <div className={css.hideConnector}></div>
          <div className={css.headerLinkContent}>
            <LocationIcon />
            <span>Location</span>
          </div>
        </div>
        <div className={css.headerLink}>
          <span className={css.notification}>2</span>
          <div className={css.headerLinkContent}>
            <BooksIcon className={css.bookIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
