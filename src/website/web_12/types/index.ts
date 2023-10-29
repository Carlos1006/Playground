export interface StringProps {
  [key: string]: string;
}
export interface Object<T> {
  [key: string]: T;
}
export interface InputClassProps {
  [key: string]: boolean;
}
export interface LinkProps {
  name: string;
  to: string;
}
export type ClickEvent = (arg: MouseEvent) => void;
