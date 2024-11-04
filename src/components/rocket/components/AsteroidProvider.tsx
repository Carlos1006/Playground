import * as THREE from "three";
import AsteroidContext from "../context/AsteroidContext";
import { useLoader } from "@react-three/fiber";
import { FC, useEffect, useState } from "react";
import { FBXLoader } from "three-stdlib";
import { IAsteroidContext, IAsteroidProvider } from "../types";
import asteroidModel from "../models/stone2.fbx";
import asteroidTexture from "../textures/stone.jpg";

const AsteroidProvider: FC<IAsteroidProvider> = ({
  children,
}: IAsteroidProvider) => {
  const fbx = useLoader(FBXLoader, asteroidModel);
  const texture = useLoader(THREE.TextureLoader, asteroidTexture);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (fbx) {
      if (Array.isArray(fbx)) {
        fbx.forEach((group) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          group.traverse((child: any) => {
            if (child.isMesh) {
              child.material.map = texture;
            }
          });
        });
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fbx.traverse((child: any) => {
          if (child.isMesh) {
            child.material.map = texture;
          }
        });
      }
      setLoaded(true);
    }
  }, [fbx, texture]);

  const value: IAsteroidContext = {
    fbx: loaded ? (Array.isArray(fbx) ? fbx[0] : fbx) : null,
  };

  return (
    <AsteroidContext.Provider value={value}>
      {children}
    </AsteroidContext.Provider>
  );
};

export default AsteroidProvider;
