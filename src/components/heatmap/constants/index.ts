import { CSSProperties } from "react";
import { IHeatMapContext } from "../types";

export const DEFAULT_HEATMAP_CONTEXT: IHeatMapContext = {
  currentLevel: 0,
  hoverTile: 0,
  tileLine: [0],
  selectedTile: 0,
  setSelectedTile: () => {
    return;
  },
  setTileLine: () => {
    return;
  },
  setHoverTile: () => {
    return;
  },
  canDrawChildren: () => true,
  canDrawGap: () => true,
  setCurrentLevel: () => {
    return;
  },
  onClick: () => {
    return;
  },
};

export const EXPAND_STYLES: CSSProperties = {
  left: "0cqi",
  top: "0cqi",
  width: "100cqi",
  height: "100cqb",
  zIndex: 100,
};
