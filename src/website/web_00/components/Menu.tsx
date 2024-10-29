import { FC } from "react";
import css from "../styles/header.module.scss";
import { IMenu } from "../types";

const Menu: FC<IMenu> = ({ x, y, open, items }: IMenu) => {
  if (!open) {
    return null;
  }
  return (
    <div
      className={css.menu}
      style={{
        left: x,
        top: `calc(${y}px + 10px)`,
      }}
    >
      {items.map(
        ({ className, title, onClick, src = "", element = null }, index) => {
          return (
            <div
              key={index}
              className={`${css.item} ${className}`}
              onClick={onClick}
            >
              {src && <img src={src} alt={title} />}
              {element !== null && element}
              <span>{title}</span>
            </div>
          );
        }
      )}
    </div>
  );
};

export default Menu;
