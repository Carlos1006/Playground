export interface IMouseMove {
  clientX: number;
  clientY: number;
}

export interface IHeader {
  onDarkModeToggle: () => void;
}

export interface IFigure {
  fix: number[];
  translateX: number;
  translateY: number;
  left: string;
  top: string;
  type: string;
}

export interface IGlitchText {
  text: string;
  searchTime?: number;
  stop?: number;
  letter?: number;
  initialDelay?: number;
}

export interface IGlitchCharacter {
  text: string;
  delay: number;
  searchTime: number;
  stop: number;
}