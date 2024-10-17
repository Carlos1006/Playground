import { Dispatch } from "react";

export type Color = [number, number, number];

export interface IAppContext {
  showMenu: boolean;
  setShowMenu: Dispatch<boolean>;
}
