export interface IHeaderMenu {
  title: string;
  japaneseTitle: string;
  id: string;
}

export interface IButton {
  title: string;
  extra?: string;
  icon?: JSX.Element;
}

import { FunctionComponent } from "react";

export type Node<P = object> = FunctionComponent<P>;
