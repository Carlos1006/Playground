import { FC, useCallback, useLayoutEffect, useRef } from "react";
import css from "../styles/forest.module.scss";
import * as THREE from "three";

const createScene = () => {
  const scene = new THREE.Scene();
  return scene;
};

const createCamera = (width: number, height: number) => {
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
  return camera;
};

const Forest: FC = () => {
  const scene = useRef<THREE.Scene>(new THREE.Scene());
  const clock = useRef<THREE.Clock>(new THREE.Clock());
  const mainObject = useRef<THREE.Group>(new THREE.Group());
  const camera = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera());
  const mainRef = useRef<HTMLDivElement>(null);

  const renderCount = useRef(0);

  const construct = useCallback((width: number, height: number) => {
    scene.current = createScene();
    camera.current = createCamera(width, height);
  }, []);

  useLayoutEffect(() => {
    if (!mainRef.current) return;
    renderCount.current += 1;
    if (renderCount.current === 1) {
      const { clientWidth: width, clientHeight: height } = mainRef.current;
      construct(width, height);
    }
  }, [construct, mainRef]);

  return <div id={css.forest} ref={mainRef}></div>;
};

export default Forest;
