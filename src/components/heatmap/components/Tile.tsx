import { FC } from "react";
import { ITile } from "../types";
import Tiler from "./Tiler";
import css from "../styles/heatmap.module.scss";

const Tile: FC<ITile> = ({
  left,
  top,
  width,
  height,
  backgroundColor,
  level,
  children,
  data,
}: ITile) => {
  const { name, color } = data;
  const hasChildren = children && children.length > 0;
  return (
    <div
      className={css.tile}
      style={{
        left,
        top,
        width,
        height,
      }}
    >
      <div
        className={`
          ${css.tileWrapper} 
          ${hasChildren ? css.tileWrapperChild : ""}
        `}
        style={{
          backgroundColor,
        }}
      >
        <span className={css.tileName} style={{}}>
          {name}
        </span>
        {hasChildren && (
          <Tiler
            data={data}
            color={color ?? backgroundColor}
            level={level + 1}
            elements={children ?? []}
          />
        )}
      </div>
    </div>
  );
};

export default Tile;
