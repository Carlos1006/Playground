import { FC, useCallback, useLayoutEffect, useRef } from "react";
import css from "../styles/forest.module.scss";
import * as THREE from "three";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { HorizontalBlurShader } from "three/examples/jsm/shaders/HorizontalBlurShader.js";
import { VerticalBlurShader } from "three/examples/jsm/shaders/VerticalBlurShader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import imgBackground from "../assets/images/Fondo.png";

const createScene = () => {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2("rgb(10,10,10)", 0.11);
  return scene;
};

const createCamera = (width: number, height: number) => {
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
  camera.position.set(0, 1.5, 8);
  return camera;
};

const createMainLight = () => {
  const mainLight = new THREE.HemisphereLight(
    "rgb(100,100,100)",
    0xffffff,
    0.1
  );
  mainLight.position.set(0, 10, 0);
  return mainLight;
};

const createRenderer = (width: number, height: number) => {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.autoClear = false;
  return renderer;
};
const createFloor = () => {
  const floorColor = "rgb(8,114,128)";
  const floorMat = new THREE.MeshStandardMaterial({
    roughness: 1,
    color: floorColor,
    metalness: 0,
    bumpScale: 0.0005,
  });
  const floorGeometry = new THREE.PlaneGeometry(100, 100);
  const floorMesh = new THREE.Mesh(floorGeometry, floorMat);
  floorMesh.receiveShadow = true;
  floorMesh.rotation.x = -Math.PI / 2.0;
  return floorMesh;
};

const createKeyLight = () => {
  const lightColor = "rgb(200,200,200)";
  const bulbGeometry = new THREE.SphereGeometry(0.17, 16, 8);
  const bulbLight = new THREE.PointLight(lightColor, 10, 10, 3);
  const bulbMat = new THREE.MeshStandardMaterial({
    emissive: "rgb(219,225,223)",
    emissiveIntensity: 5,
    color: 0x000000,
  });
  bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
  bulbLight.castShadow = true;
  bulbLight.position.z = -1.5;
  bulbLight.position.x = 0;
  bulbLight.position.y = 0.5;
  // bulbLight.update = () => {
  //   var time = Date.now() * 0.001;
  //   bulbLight.intensity = (Math.cos(time) + 1) * 7 + 2;
  // };
  return bulbLight;
};

const createFillLight = () => {
  const lightColor2 = "rgb(0,100,100)";
  const bulbGeometry2 = new THREE.SphereGeometry(0.001, 16, 8);
  const bulbLight2 = new THREE.PointLight(lightColor2, 6, 10, 5);
  const bulbMat2 = new THREE.MeshStandardMaterial({
    emissive: "rgb(0,0,0)",
    emissiveIntensity: 0,
    color: 0x000000,
  });
  bulbLight2.add(new THREE.Mesh(bulbGeometry2, bulbMat2));
  //bulbLight2.castShadow = true;
  bulbLight2.position.z = 3;
  bulbLight2.position.x = 2;
  bulbLight2.position.y = 0.5;
  // bulbLight2.update = function () {};
  return bulbLight2;
};

const createBackLight = () => {
  const lightColor3 = "rgb(0,70,100)";
  const bulbGeometry3 = new THREE.SphereGeometry(0.001, 16, 8);
  const bulbLight3 = new THREE.PointLight(lightColor3, 9, 10, 10);
  const bulbMat3 = new THREE.MeshStandardMaterial({
    emissive: "rgb(0,0,0)",
    emissiveIntensity: 0,
    color: 0x000000,
  });
  bulbLight3.add(new THREE.Mesh(bulbGeometry3, bulbMat3));
  //bulbLight3.castShadow = true;
  bulbLight3.position.z = 5;
  bulbLight3.position.x = -4;
  bulbLight3.position.y = 1;
  //bulbLight3.update = function () {};
  return bulbLight3;
};

const createBack2Light = () => {
  const lightColor2 = "rgb(0,50,100)";
  const bulbGeometry2 = new THREE.SphereGeometry(0.001, 16, 8);
  const bulbLight2 = new THREE.PointLight(lightColor2, 8, 10, 7);
  const bulbMat2 = new THREE.MeshStandardMaterial({
    emissive: "rgb(0,0,0)",
    emissiveIntensity: 0,
    color: 0x000000,
  });
  bulbLight2.add(new THREE.Mesh(bulbGeometry2, bulbMat2));
  //bulbLight2.castShadow = true;
  bulbLight2.position.z = 2.3;
  bulbLight2.position.x = -1.5;
  bulbLight2.position.y = 0.3;
  //bulbLight2.update = function () {};
  return bulbLight2;
};

const loadRocks = async (): Promise<THREE.Group> => {
  const material = new THREE.MeshLambertMaterial({ color: "rgb(0,108,118)" });
  const group = new THREE.Group();
  const objLoader = new OBJLoader();
  const obj = await objLoader.loadAsync("/src/assets/models/Rocas.obj");
  obj.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material = material;
    }
  });
  obj.position.set(0, 0, 0);
  obj.scale.set(0.2, 0.2, 0.2);
  group.add(obj);
  return group;
};

const loadStones = async (): Promise<THREE.Group> => {
  const material = new THREE.MeshLambertMaterial({ color: "rgb(0,66,100)" });
  const group = new THREE.Group();
  const objLoader = new OBJLoader();
  const obj = await objLoader.loadAsync("/src/assets/models/Piedras2.obj");
  obj.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material = material;
    }
  });
  obj.position.set(0, 0, 0);
  obj.scale.set(0.2, 0.2, 0.2);
  group.add(obj);
  return group;
};

const createGrass = async (): Promise<THREE.Group> => {
  const material = new THREE.MeshLambertMaterial({ color: "rgb(4,52,64)" });
  const group = new THREE.Group();
  const objLoader = new OBJLoader();
  const obj = await objLoader.loadAsync("/src/assets/models/Pasto3.obj");
  obj.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material = material;
    }
  });
  obj.position.set(0, 0.09, 0);
  obj.scale.set(0.2, 0.2, 0.2);
  group.add(obj);
  return group;
};

const createTrees = async (): Promise<THREE.Group> => {
  const material = new THREE.MeshLambertMaterial({ color: "rgb(0,102,106)" });
  const group = new THREE.Group();
  const objLoader = new OBJLoader();
  const obj = await objLoader.loadAsync("/src/assets/models/Arboles2.obj");
  obj.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material = material;
    }
  });
  obj.position.set(0, 0.0, 0);
  obj.scale.set(0.2, 0.2, 0.2);
  group.add(obj);
  return group;
};

const Forest: FC = () => {
  const scene = useRef<THREE.Scene>(new THREE.Scene());
  const clock = useRef<THREE.Clock>(new THREE.Clock());
  const mainObject = useRef<THREE.Group>(new THREE.Group());
  const camera = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera());
  const mainRef = useRef<HTMLDivElement>(null);
  const mainLight = useRef<THREE.HemisphereLight>(new THREE.HemisphereLight());
  const renderer = useRef<THREE.WebGLRenderer>(new THREE.WebGLRenderer());
  const floor = useRef<THREE.Mesh>(new THREE.Mesh());
  const keyLight = useRef<THREE.PointLight>(new THREE.PointLight());
  const fillLight = useRef<THREE.PointLight>(new THREE.PointLight());
  const backLight = useRef<THREE.PointLight>(new THREE.PointLight());
  const back2Light = useRef<THREE.PointLight>(new THREE.PointLight());
  const rotationObject = useRef<THREE.Group>(new THREE.Group());

  const renderCount = useRef(0);

  const createComposer = () => {
    const hblur = new ShaderPass(HorizontalBlurShader);
    const vblur = new ShaderPass(VerticalBlurShader);
    vblur.renderToScreen = true;
    hblur.uniforms.h.value = 0; //0.00005;
    vblur.uniforms.v.value = 0; //0.00005;
    const composer = new EffectComposer(renderer.current);
    composer.addPass(new RenderPass(scene.current, camera.current));
    composer.addPass(hblur);
    composer.addPass(vblur);
  };

  const animate = useCallback(() => {
    // const delta = clock.current.getDelta();
    requestAnimationFrame(animate);
    // const time = Date.now() * 0.001;
    const time = clock.current.getElapsedTime() * 0.75;
    keyLight.current.intensity = (Math.cos(time) + 1) * 10 + 2;
    keyLight.current.position.x = Math.cos(time * 0.7) * 1.5; // sin
    renderer.current.render(scene.current, camera.current);
  }, []);

  const loadModels = async () => {
    const rocks = await loadRocks();
    mainObject.current.add(rocks);

    const stones = await loadStones();
    mainObject.current.add(stones);

    const grass = await createGrass();
    mainObject.current.add(grass);

    const trees = await createTrees();
    mainObject.current.add(trees);
  };

  const construct = useCallback(
    (width: number, height: number) => {
      scene.current = createScene();
      camera.current = createCamera(width, height);
      mainLight.current = createMainLight();
      renderer.current = createRenderer(width, height);
      createComposer();
      floor.current = createFloor();
      keyLight.current = createKeyLight();
      fillLight.current = createFillLight();
      backLight.current = createBackLight();
      back2Light.current = createBack2Light();

      mainObject.current.add(keyLight.current);
      mainObject.current.add(fillLight.current);
      mainObject.current.add(backLight.current);
      mainObject.current.add(back2Light.current);
      mainObject.current.add(mainLight.current);
      mainObject.current.add(floor.current);
      mainObject.current.rotation.y = -0.32813170079773146;
      mainObject.current.position.x = 0.98;
      mainObject.current.position.y = 0.379;
      mainObject.current.position.z = 1.03;

      rotationObject.current.add(mainObject.current);

      scene.current.add(rotationObject.current);
      mainRef?.current?.appendChild(renderer.current.domElement);
      loadModels();
      animate();
    },
    [animate]
  );

  useLayoutEffect(() => {
    if (!mainRef.current) return;
    renderCount.current += 1;
    if (renderCount.current === 1) {
      const { clientWidth: width, clientHeight: height } = mainRef.current;
      construct(width, height);
      const windowHalf = new THREE.Vector2(width / 2, height / 2);
      mainRef.current.addEventListener("mousemove", (event) => {
        const x = event.clientX - windowHalf.x;
        const y = event.clientY - windowHalf.y;
        rotationObject.current.rotation.y = x / 50000;
        rotationObject.current.rotation.x = y / 50000;
      });
    }
  }, [construct, mainRef]);

  return (
    <div
      id={css.forest}
      ref={mainRef}
      style={{
        backgroundImage: `url(${imgBackground})`,
      }}
    ></div>
  );
};

export default Forest;
