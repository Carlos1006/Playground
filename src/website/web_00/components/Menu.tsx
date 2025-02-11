import { FC } from "react";
import css from "../styles/header.module.scss";
import { IMenu } from "../types";

const Menu: FC<IMenu> = ({
  x,
  y,
  open,
  items,
  forcedRight = null,
  forcedBottom = null,
}: IMenu) => {
  const inlineRight = forcedRight !== null ? "right" : "left";
  const blockAttribute = forcedBottom !== null ? "bottom" : "top";
  const extra = 10;

  const inlineValue = forcedRight !== null ? forcedRight : x - extra;
  const blockValue =
    forcedBottom !== null ? forcedBottom : `calc(${y}px + ${extra}px)`;

  if (!open) {
    return null;
  }
  return (
    <div
      className={css.menu}
      style={{
        [inlineRight]: inlineValue,
        [blockAttribute]: blockValue,
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
