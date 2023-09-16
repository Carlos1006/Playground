export interface IDonutChartData<CustomSection = object> {
  value: number;
  color: string;
  valueLabel: string;
  title?: string;
  section?: CustomSection;
  label?: string;
}

export interface IDonutGraphPlaceholder {
  size: number | string;
}

export interface Coord {
  x: number;
  y: number;
}

export interface IExtendedPieChart<CustomSection = object>
  extends IDonutChartData<CustomSection> {
  draw: string;
  drawPercent: number;
  angleRange: [number, number];
}

export type VoidFunction = (e: globalThis.MouseEvent) => void;

export interface IDonutChart<CustomSection = object> {
  size?: number | string;
  data: Array<IDonutChartData<CustomSection>>;
  onCenterClick?: ((section: IDonutChartData<CustomSection>) => void) | null;
}
