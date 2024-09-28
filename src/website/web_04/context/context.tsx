import { FC, useRef, useState } from "react";
import * as THREE from "three";
import { IMainContext, MainContext } from "./createContext";

const MainContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const imgContainerRef1 = useRef<HTMLDivElement>(null);
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const imgContainerRef2 = useRef<HTMLDivElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const clock = useRef<THREE.Clock>(new THREE.Clock());
  const [imgData, setImgData] = useState<ImageData | null>(null);
  const cameraMove = useRef(0);

  const value: IMainContext = {
    imgContainerRef1,
    canvasRef1,
    imgContainerRef2,
    canvasRef2,
    clock,
    imgData,
    cameraMove,
    setImgData,
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainContextProvider;
