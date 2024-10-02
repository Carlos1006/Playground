import { FC, useEffect } from "react";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { extend, useThree } from "@react-three/fiber";
import { UnrealBloomPass } from "three-stdlib";

extend({ UnrealBloomPass });

const Effects: FC = () => {
  const { camera } = useThree();

  useEffect(() => {
    // Configura la cámara para renderizar solo la capa 1
    camera.layers.enable(1);
    return () => {
      camera.layers.disable(1);
    };
  }, [camera]);

  return (
    <EffectComposer>
      <DepthOfField
        focusDistance={0}
        focalLength={0.02}
        bokehScale={2}
        height={480}
      />
      <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
      {/* <unrealBloomPass threshold={0.5} strength={0.4} radius={0.8} /> */}
    </EffectComposer>
  );
};

export default Effects;
