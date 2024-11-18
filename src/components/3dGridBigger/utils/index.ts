import * as THREE from "three";
import { IImage, IPixel } from "../types";

export const createScene = (): THREE.Scene => {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x222244, 50, 100);
  return scene;
};

export const createBar = (
  x: number,
  y: number,
  z: number,
  height = 1
): THREE.Mesh => {
  const barGeometry = new THREE.BoxGeometry(0.1, height, 0.1);
  const barMaterial = new THREE.MeshPhongMaterial({
    color: "rgb(47,180,200)",
    // color: "rgb(180,47,230)",
    emissive: 0x000000,
    specular: 0x111111,
    shininess: 30,
    refractionRatio: 0.5,
    reflectivity: 0.5,
  });
  const bar = new THREE.Mesh(barGeometry, barMaterial);
  bar.position.x = x;
  bar.position.y = y;
  bar.position.z = z;
  bar.castShadow = false;
  bar.receiveShadow = false;
  return bar;
};

export const createBase = (): THREE.Mesh => {
  const flatCubeGeometry = new THREE.BoxGeometry(5.3, 5, 5.3);
  const flatCubeMaterial = new THREE.MeshPhongMaterial({
    color: "rgb(23,23,30)",
    emissive: 0x000000,
    specular: 0x111111,
    shininess: 30,
    refractionRatio: 0.98,
    reflectivity: 1,
  });
  const flatCube = new THREE.Mesh(flatCubeGeometry, flatCubeMaterial);
  flatCube.receiveShadow = false;
  flatCube.castShadow = false;
  flatCube.position.y = -2.8;
  return flatCube;
};

export const createCamera = (
  width: number,
  height: number
): THREE.PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 7;
  return camera;
};

export const createRenderer = (
  width: number,
  height: number
): THREE.WebGLRenderer => {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  renderer.setSize(width, height);
  return renderer;
};

export const createAmbientLight = (): THREE.HemisphereLight => {
  const mainLight = new THREE.HemisphereLight(
    "rgb(128,128,128)",
    "rgb(84,85,255)",
    7
  );
  mainLight.position.set(0, 5, 0);
  return mainLight;
};

export const createReferenceCube = (): THREE.Mesh => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x049ef4,
    emissive: 0x000000,
    specular: 0x111111,
    shininess: 30,
    refractionRatio: 0.98,
    reflectivity: 1,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.receiveShadow = true;
  cube.castShadow = true;
  cube.position.y = 1;
  return cube;
};

export const createSpotLight = (): THREE.Mesh => {
  const light = new THREE.SpotLight("rgb(133,248,248)", 20);
  // const light = new THREE.SpotLight("rgb(255, 255, 255)", 50);
  light.angle = 1.05;
  light.decay = 2;
  light.penumbra = 1;
  light.shadow.camera.near = 10;
  light.shadow.camera.far = 1000;
  light.shadow.camera.fov = 30;
  light.shadow.mapSize.width = 256;
  light.shadow.mapSize.height = 256;
  light.castShadow = true;
  light.shadow.bias = -0.002;
  light.shadow.radius = 4;
  const sphereGeometry = new THREE.SphereGeometry(0.05, 16, 8);
  const sphere = new THREE.Mesh(
    sphereGeometry,
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  sphere.position.y = 2;
  sphere.position.x = 1;
  sphere.position.z = 1;
  sphere.add(light);
  return sphere;
};

export const createPixelMatrix = (data: ImageData): IImage => {
  const pixelMatrix: IPixel[][] = [];
  const width = data.width;
  for (let i = 0; i < data.data.length; i += 4) {
    const x = (i / 4) % width;
    const y = Math.floor(i / 4 / width);
    if (!pixelMatrix[y]) pixelMatrix[y] = [];
    pixelMatrix[y][x] = {
      r: data.data[i],
      g: data.data[i + 1],
      b: data.data[i + 2],
      a: data.data[i + 3],
      h: 0,
    };
  }
  return {
    pixels: pixelMatrix,
    width: data.width,
    height: data.height,
  };
};

export const getPixel = (image: IImage, x: number, y: number): IPixel => {
  if (image.pixels[y] && image.pixels[y][x]) return image.pixels[y][x];
  return { r: 0, g: 0, b: 0, a: 0, h: 0 };
};
