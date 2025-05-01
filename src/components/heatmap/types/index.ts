import { Dispatch, SetStateAction } from "react";

export interface IElement {
  id: number;
  name: string;
  value: number;
  color?: string;
  children?: IElement[];
}

export interface IElementLevel extends IElement {
  level?: number;
}

export interface IExtendedElement extends IElement {
  percentage: number;
}

export interface ITile {
  level: number;
  left: string;
  top: string;
  width: string;
  height: string;
  backgroundColor: string;
  backgroundColorHover: string;
  data: IElement;
  children?: IElement[];
  parentLine: number[];
}

export interface ITiler {
  data: IElement;
  elements: IElement[];
  color: string;
  level: number;
  parentLine: number[];
}

export interface IClickPayload {
  id: number;
  level: number;
  parentLine: number[];
}

export interface IHeatMapContext {
  currentLevel: number;
  hoverTile: number;
  tileLine: number[];
  selectedTile: number;
  setSelectedTile: Dispatch<SetStateAction<number>>;
  setTileLine: Dispatch<SetStateAction<number[]>>;
  setHoverTile: Dispatch<SetStateAction<number>>;
  setCurrentLevel: Dispatch<SetStateAction<number>>;
  canDrawChildren: (drawing: number) => boolean;
  canDrawGap: (drawing: number) => boolean;
  onClick: (payload: IClickPayload) => void;
  addToAnimationLine: (line: number[]) => void;
  setAnimatedLine: Dispatch<SetStateAction<number[]>>;
  animatedLine: number[];
}

export interface IReturnButton {
  onClick: () => void;
}
