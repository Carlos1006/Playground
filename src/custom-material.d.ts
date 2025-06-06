// filepath: c:\Dev\Playground\src\custom-material.d.ts
import * as THREE from "three";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      gradientMaterial: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        attach?: string;
        color1?: THREE.Color | string;
        color2?: THREE.Color | string;
      };
    }
  }
}
export {};
