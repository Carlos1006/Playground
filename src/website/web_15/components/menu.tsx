import { FC } from "react";
import css from "../styles/main.module.scss";
import { GoLocation as LocationIcon } from "react-icons/go";
import { IoSearch as SearchIcon } from "react-icons/io5";
import { MenuProps } from "../types";

const Menu: FC<MenuProps> = ({ show }: MenuProps) => {
  return (
    <div className={`${css.menu} ${show ? css.isOn : ""}`}>
      <div>
        <SearchIcon />
        <input placeholder="Search..."></input>
      </div>
      <div>
        <span>Home</span>
      </div>
      <div>
        <span>About</span>
      </div>
      <div>
        <LocationIcon />
        <span>Location</span>
      </div>
    </div>
  );
};

export default Menu;
