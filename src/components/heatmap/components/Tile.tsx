import { FC } from "react";
import { ITile } from "../types";
import Tiler from "./Tiler";
// import css from "../styles/heatmap.module.scss";

const Tile: FC<ITile> = ({
  left,
  top,
  width,
  height,
  backgroundColor,
  level,
  children,
  data: { name, color },
}: ITile) => {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "calc(100% - 5px)",
          height: "calc(100% - 5px)",
          backgroundColor,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: "12px",
            fontFamily: "Roboto",
          }}
        >
          {name}
        </span>
        <Tiler
          color={color ?? backgroundColor}
          level={level + 1}
          elements={children ?? []}
        />
      </div>
    </div>
  );
};

export default Tile;
