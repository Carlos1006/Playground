import { createContext } from "react";

export interface IMainContext {
  euler: React.MutableRefObject<THREE.Euler> | null;
  camera: React.MutableRefObject<THREE.PerspectiveCamera> | null;
  imgContainerRef1: React.MutableRefObject<HTMLDivElement | null> | null;
  canvasRef1: React.MutableRefObject<HTMLCanvasElement | null> | null;
  imgContainerRef2: React.MutableRefObject<HTMLDivElement | null> | null;
  canvasRef2: React.MutableRefObject<HTMLCanvasElement | null> | null;
  clock: React.MutableRefObject<THREE.Clock> | null;
  imgData: ImageData | null;
  setImgData: React.Dispatch<React.SetStateAction<ImageData | null>>;
}

export const MainContext = createContext<IMainContext>({
  euler: null,
  camera: null,
  imgContainerRef1: null,
  canvasRef1: null,
  imgContainerRef2: null,
  canvasRef2: null,
  clock: null,
  imgData: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setImgData: () => {},
});

