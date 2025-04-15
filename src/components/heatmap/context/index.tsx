import { createContext } from "react";
import { IHeatMapContext } from "../types";
import { DEFAULT_HEATMAP_CONTEXT } from "../constants";

const HeatMapContext = createContext<IHeatMapContext>(DEFAULT_HEATMAP_CONTEXT);
HeatMapContext.displayName = "HeatMapContext";

export default HeatMapContext;
