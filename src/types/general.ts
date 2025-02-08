import React from "react";

export type Node<P = object> = React.FunctionComponent<P>;
export interface Coordinates {
  x: number;
  y: number;
}

export interface IThemeCss {
  old: string;
  light: string;
  dark: string;
}
