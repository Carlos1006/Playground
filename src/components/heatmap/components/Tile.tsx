import { FC, useRef, useState } from "react";
import { ITile } from "../types";
import Tiler from "./Tiler";
import css from "../styles/heatmap.module.scss";
import { useHeatMapContext } from "../hooks";
import { EXPAND_STYLES } from "../constants";

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
  parentLine,
}: ITile) => {
  const tileRef = useRef<HTMLDivElement | null>(null);
  const { name, color } = data;
  const hasChildren = children && children.length > 0;
  const [hover, setHover] = useState<boolean>(false);
  const {
    currentLevel,
    selectedTile,
    canDrawChildren,
    canDrawGap,
    onClick,
    setHoverTile,
  } = useHeatMapContext();

  const onHover = (): void => {
    setHoverTile(data.id);
    setHover(true);
  };

  const onLeave = (): void => {
    setHover(false);
  };

  const canDrawChildrenValue = hasChildren && canDrawChildren(level);

  const onClickHandler = (): void => {
    onClick({
      id: data.id,
      level,
      parentLine: [data.id, ...parentLine],
    });
  };

  return (
    <div
      className={css.tile}
      style={{
        left,
        top,
        width,
        height,
        ...(currentLevel === level && selectedTile === data.id
          ? EXPAND_STYLES
          : {}),
      }}
      ref={tileRef}
      onMouseUp={onClickHandler}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        className={`
          ${css.tileWrapper} 
          ${canDrawGap(level) ? css.gap : ""}
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
            parentLine={[data.id, ...parentLine]}
          />
        )}
      </div>
    </div>
  );
};

export default Tile;
