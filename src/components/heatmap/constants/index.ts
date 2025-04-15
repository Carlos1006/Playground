import { IHeatMapContext } from "../types";

export const DEFAULT_HEATMAP_CONTEXT: IHeatMapContext = {
  currentLevel: 0,
  canDrawChildren: () => true,
  candDrawGap: () => true,
};
