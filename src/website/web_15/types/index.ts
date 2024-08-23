export interface BlueGradientProps {
  width: number;
  height: number;
}

export type PinkCthulhuProps = BlueGradientProps;

export interface GrayGradientProps {
  width: number;
  height: number;
  right?:number;
  top?:number;
}

export interface ArrowRightProps {
  width: string;
}

export interface TopLinkProps {
  remove: number;
}

export interface HeaderProps {
  darkMode: boolean;
  onDarkModeChange: () => Promise<void>;
}