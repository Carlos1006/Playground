import { Canvas } from "@react-three/fiber";
import { FC, useState } from "react";
import { Bloom, Noise } from "@react-three/postprocessing"; // EffectComposer
import css from "./styles/main.module.scss";
import GlobeMonochromatic from "./components/Globe";
import ColorPicker from "./components/ColorPicker";
import { ColorRGBA } from "./types";
import { normalizeRGB } from "./utils";
import { SoftShadows } from "@react-three/drei";

export const GlobeCanvasMonochromatic: FC = () => {
  const [active] = useState(true);

  const [background, setBackground] = useState<ColorRGBA>([
    ...normalizeRGB([102, 102, 128]),
    0.5,
  ]);

  const [outline, setOutline] = useState<ColorRGBA>([
    ...normalizeRGB([76, 76, 102]),
    0.7,
  ]);

  const [land, setLand] = useState<ColorRGBA>([
    ...normalizeRGB([191, 93, 38]),
    1,
  ]);

  return (
    <>
      <div id={css.controls}>
        <ColorPicker
          title="Background"
          alpha={0.5}
          color={[102, 102, 128]}
          onChange={(color): void => setBackground(color)}
        />
        <ColorPicker
          title="Outline"
          alpha={0.7}
          color={[76, 76, 102]}
          onChange={(color): void => setOutline(color)}
        />
        <ColorPicker
          title="Land"
          alpha={1}
          color={[153, 153, 178]}
          onChange={(color): void => setLand(color)}
        />
      </div>
      <Canvas camera={{ position: [4, 0, 0] }} className={css.canvas}>
        <SoftShadows />
        <GlobeMonochromatic
          background={background}
          outline={outline}
          land={land}
        />
        {/* <EffectComposer> */}
        {/* Efecto Bloom para resaltar el brillo */}
        <Bloom
          mipmapBlur
          intensity={active ? 1.5 : 0} // Solo activado si está 'active'
          radius={0.3}
          // threshold={0.1}
        />
        {/* Agregar un pequeño ruido o blur si es necesario */}
        <Noise opacity={0.1} />
        {/* </EffectComposer> */}
      </Canvas>
    </>
  );
};

export default GlobeCanvasMonochromatic;
