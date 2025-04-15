import { useContext } from "react";
import HeatMapContext from "../context";
import { IHeatMapContext } from "../types";

export const useHeatMapContext = (): IHeatMapContext => {
  return useContext(HeatMapContext);
};
