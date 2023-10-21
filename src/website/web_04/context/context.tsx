import { useRef } from "react";
import * as THREE from "three";
import { IMainContext, MainContext } from "./createContext";

const MainContextProvider = ({ children }: { children: React.ReactNode }) => {
  const euler = useRef<THREE.Euler>(new THREE.Euler(0, 0, 0, "YXZ"));
  const camera = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera());
  const imgContainerRef1 = useRef<HTMLDivElement>(null);
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const imgContainerRef2 = useRef<HTMLDivElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const clock = useRef<THREE.Clock>(new THREE.Clock());

  const value: IMainContext = {
    euler,
    camera,
    imgContainerRef1,
    canvasRef1,
    imgContainerRef2,
    canvasRef2,
    clock,
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainContextProvider;
