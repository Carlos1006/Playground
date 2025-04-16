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
    selectedTile,
    tileLine,
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

  const selected = tileLine.includes(data.id);
  const hideName = selected && selectedTile !== data.id;

  return (
    <div
      className={`${css.tile} ${selected ? css.selected : ""}`}
      style={{
        left,
        top,
        width,
        height,
        ...(selected ? EXPAND_STYLES : {}),
      }}
      data-level={level}
      data-id={data.id}
      ref={tileRef}
      onMouseUp={onClickHandler}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        data-level={level}
        data-id={data.id}
        className={`
          ${css.tileWrapper} 
          ${canDrawGap(level) ? css.gap : ""}
          ${canDrawChildrenValue ? css.tileWrapperChild : ""}
          ${selected ? css.selectedTileWrapper : ""}
        `}
        style={{
          backgroundColor: hover ? backgroundColorHover : backgroundColor,
        }}
      >
        <span
          className={`${css.tileName} ${hideName ? css.hideName : ""}`}
          style={{}}
        >
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
