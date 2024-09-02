export interface BlueGradientProps {
  width: number;
  height: number;
}

export interface PinkCthulhuProps extends BlueGradientProps {
  imgWidth: number;
  imgLeft: number;
  imgBottom: number;
}

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
  isMobile: boolean;
  darkMode: boolean;
  onDarkModeChange: () => void;
  onMenuClick: () => void;
  showingMenu: boolean;
}

export interface DimensionProps {
  width: number;
  height: number;
}

export interface RightTopProps {
  right: number;
  top: number;
}

export interface TogglerProps {
  onClick: () => void;
  isOn: boolean;
}

export interface GrayCthulhu2Props {
  squareSide: number;
  left: number;
  width: number;
}

export interface TextProps {
  isMobile: boolean;
}

export interface MarqueeProps {
  isMobile: boolean;
}

export interface MenuProps {
  show: boolean;
}