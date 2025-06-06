import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

const GradientMaterial = shaderMaterial(
  {
    color1: new THREE.Color("rgb(22, 30, 82)"),
    color2: new THREE.Color("rgb(50, 70, 199)"),
    emissive: new THREE.Color("rgb(5, 7, 19)"),
    lightPosition: new THREE.Vector3(10, 10, 10),
    shininess: 10,
  },
  `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 emissive;
    uniform vec3 lightPosition;
    uniform float shininess;

    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 lightDir = normalize(lightPosition - vPosition);
      vec3 viewDir = normalize(-vPosition);
      vec3 reflectDir = reflect(-lightDir, normal);

      float diff = max(dot(normal, lightDir), 0.0);
      float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);

      float t = (vPosition.y + 1.0) / 2.0;
      vec3 baseColor = mix(color1, color2, t);

      vec3 ambient = 0.1 * baseColor;
      vec3 diffuse = diff * baseColor;
      vec3 specular = spec * vec3(1.0); // white specular

      vec3 finalColor = ambient + diffuse + specular + emissive;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ GradientMaterial });

export { GradientMaterial };
export default {};
