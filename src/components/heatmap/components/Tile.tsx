import { FC, useState } from "react";
import { ITile } from "../types";
import Tiler from "./Tiler";
import css from "../styles/heatmap.module.scss";
import { useHeatMapContext } from "../hooks";

const Tile: FC<ITile> = ({
  left,
  top,
  width,
  height,
  backgroundColor,
  backgroundColorHover,
  level,
  children,
  data,
}: ITile) => {
  const { name, color } = data;
  const hasChildren = children && children.length > 0;
  const [hover, setHover] = useState<boolean>(false);
  const { canDrawChildren, candDrawGap } = useHeatMapContext();

  const onHover = (): void => {
    setHover(true);
  };

  const onLeave = (): void => {
    setHover(false);
  };

  const canDrawChildrenValue = hasChildren && canDrawChildren(level);

  return (
    <div
      className={css.tile}
      style={{
        left,
        top,
        width,
        height,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        className={`
          ${css.tileWrapper} 
          ${candDrawGap(level) ? css.gap : ""}
          ${canDrawChildrenValue ? css.tileWrapperChild : ""}
        `}
        style={{
          backgroundColor: hover ? backgroundColorHover : backgroundColor,
        }}
      >
        <span className={css.tileName} style={{}}>
          {name}
        </span>
        {canDrawChildrenValue && canDrawChildren(level) && (
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
