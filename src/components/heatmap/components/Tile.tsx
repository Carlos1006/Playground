import { FC, useRef, useState } from "react";
import { ITile } from "../types";
import Tiler from "./Tiler";
import css from "../styles/heatmap.module.scss";
import { useHeatMapContext } from "../hooks";
import { EXPAND_STYLES } from "../constants";
import { useResizeObserver } from "../hooks/useResizeObserver";
import { abbreviateText, measeureText } from "../utils";

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
  const textRef = useRef<HTMLSpanElement | null>(null);
  const { name, color } = data;
  const [text, setText] = useState<string>(data.name);
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

  useResizeObserver({
    target: tileRef,
    callback: () => {
      if (!tileRef.current) return;
      const textWidth = measeureText(name, "12px Roboto");
      const { width } = tileRef.current.getBoundingClientRect();
      if (textWidth > width) {
        setText(abbreviateText(name));
      } else {
        setText(name);
      }
    },
  });

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
          ref={textRef}
          className={`${css.tileName} ${hideName ? css.hideName : ""}`}
          style={{}}
        >
          {text}
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
