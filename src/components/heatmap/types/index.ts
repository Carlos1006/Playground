export interface IElement {
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
}

export interface ITiler {
  data: IElement;
  elements: IElement[];
  color: string;
  level?: number;
}

export interface IHeatMapContext {
  currentLevel: number;
  canDrawChildren: (drawing: number) => boolean;
  candDrawGap: (drawing: number) => boolean;
}
