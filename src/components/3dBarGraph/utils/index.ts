import * as THREE from "three";

export function createScene(): THREE.Scene {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x222244, 50, 100);
  return scene;
}

export function createCamera(
  width: number,
  height: number,
  fov: number
): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000);
  camera.position.z = 3;
  return camera;
}

export function createAmbientLight(): THREE.HemisphereLight {
  const mainLight = new THREE.HemisphereLight(
    "rgb(128,128,128)",
    "rgb(84,85,255)",
    7
  );
  mainLight.position.set(0, 5, 0);
  return mainLight;
}

export function createReferenceCube(): THREE.Mesh {
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
  cube.position.y = 0;
  return cube;
}

export function createSpotLight(): THREE.Mesh {
  const light = new THREE.SpotLight("rgb(133,248,248)", 20);
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
}

export function createRenderer(
  width: number,
  height: number
): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  renderer.setSize(width, height);
  return renderer;
}

export function getContrastColor(color: number): number {
  return color ^ 0xffffff;
}
