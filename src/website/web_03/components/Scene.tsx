import React, { FC, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import envImg from "../assets/images/env.png";
import { DegToRad, Random } from "../utils";
import { OrbitControls } from "@three-ts/orbit-controls";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

interface SceneProps {
  id: string;
  children?: React.ReactNode;
}

interface ExtendedCube extends THREE.Group<THREE.Object3DEventMap> {
  y: number;
  direction: number;
}

const Scene: FC<SceneProps> = ({ id, children }: SceneProps) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (sceneRef.current && !loaded) {
      const scene = new THREE.Scene();
      const clock = new THREE.Clock();
      const mainObject = new THREE.Group();
      const toUpdate: THREE.Object3D[] = [];
      const blackMaterial = new THREE.MeshPhongMaterial({
        color: "#000000",
        emissive: "#000000",
        specular: "#111111",
        shininess: 30,
        refractionRatio: 0.98,
        reflectivity: 1,
      });
      const blueMaterial = new THREE.MeshStandardMaterial({
        color: "rgb(3,201,221)",
        roughness: 0.9,
      });
      const envMap = new THREE.TextureLoader().load(envImg);
      blueMaterial.envMap = envMap;

      const height = sceneRef.current.clientHeight;
      const width = sceneRef.current.clientWidth;

      const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
      camera.position.set(0, 9, 10);
      const orbitControl = new OrbitControls(camera);
      orbitControl.enableZoom = false;
      orbitControl.enableDamping = false;
      orbitControl.enablePan = false;
      orbitControl.maxPolarAngle = DegToRad(81);
      orbitControl.minAzimuthAngle = DegToRad(-10);
      orbitControl.maxAzimuthAngle = DegToRad(30);
      orbitControl.rotateSpeed = 0.001;
      orbitControl.dispose();
      scene.add(camera);

      const mainLight = new THREE.HemisphereLight(
        "rgb(128,128,128)",
        "rgb(84,85,255)",
        7
      );
      mainLight.position.set(0, 5, 0);
      scene.add(mainLight);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.autoClear = false;

      sceneRef.current.appendChild(renderer.domElement);

      scene.fog = new THREE.FogExp2("rgb(10,10,10)", 0.11);

      const floorColor = "rgb(0,0,0)";
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
      mainObject.add(floorMesh);

      const light = new THREE.SpotLight("rgb(133,248,248)", 100000);
      light.position.y = 100;
      light.angle = 1.05;
      light.decay = 2;
      light.penumbra = 1;
      light.shadow.camera.near = 10;
      light.shadow.camera.far = 1000;
      light.shadow.camera.fov = 30;
      mainObject.add(light);

      mainObject.rotation.y = -0.32813170079773146;
      mainObject.position.x = 0.98;
      mainObject.position.y = 0.379;
      mainObject.position.z = 1.03;

      const rotationObject = new THREE.Group();
      rotationObject.add(mainObject);

      toUpdate.push(rotationObject);
      scene.add(rotationObject);

      const cubos: ExtendedCube[][] = [];

      let windowHalf = new THREE.Vector2(width / 2, height / 2);

      const loadCubo = async (): Promise<
        THREE.Group<THREE.Object3DEventMap>
      > => {
        const group = new THREE.Group();
        const objLoader = new OBJLoader();
        const obj = await objLoader.loadAsync(
          "/src/website/web_03/assets/model/Cube.obj"
        );
        obj.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = blackMaterial;
          }
        });
        obj.position.set(0, -1, 0);
        obj.scale.set(0.06, 0.06, 0.06);
        group.add(obj);
        return group;
      };

      const animate = () => {
        orbitControl.update();
        renderer.render(scene, camera);

        renderer.shadowMap.enabled = true;
        renderer.setClearColor(0x000000, 0);
        renderer.setViewport(0, 0, width, height);
        renderer.clear();
        renderer.render(scene, camera);

        orbitControl.update();
        windowHalf = new THREE.Vector2(
          window.innerWidth / 2,
          window.innerHeight / 2
        );
        step();

        requestAnimationFrame(animate);
      };

      const step = () => {
        const delta = clock.getDelta();
        for (let x = 0; x < cubos.length; x++) {
          for (let z = 0; z < cubos[x].length; z++) {
            const cubo = cubos[x][z];
            if (cubo.direction == 1) {
              cubo.y += 0.07 * delta;
              if (cubo.y >= -1) {
                cubo.y = -1;
                cubo.direction = 0;
              }
            } else {
              cubo.y -= 0.07 * delta;
              if (cubo.y <= -1.6) {
                cubo.y = -1.6;
                cubo.direction = 1;
              }
            }
            cubo.position.y = cubo.y;
          }
        }
      };

      const cloneCube = (cubo: THREE.Group<THREE.Object3DEventMap>) => {
        for (let x = -8; x < 6; x++) {
          if (Array.isArray(cubos[x + 8]) == false) {
            cubos[x + 8] = [];
          }
          for (let z = -4; z < 5; z++) {
            const cubo_ = cubo.clone() as ExtendedCube;
            const x1 = x * 1.7;
            const y1 = Random(-1.6, -1);
            const z1 = z * 1.7;
            cubo_.position.set(x1, y1, z1);
            cubo_.y = y1;
            cubo_.direction = 1;
            cubos[x + 8][z + 4] = cubo_;
            if (x == 2 && z == 2) {
              (cubo_.children[0].children[0] as THREE.Mesh).material =
                new THREE.MeshPhongMaterial({
                  color: "#1945a9",
                  emissive: "#0000ff",
                  specular: "#00F",
                });
            }
            if (x == -1 && z == -1) {
              (cubo_.children[0].children[0] as THREE.Mesh).material =
                new THREE.MeshPhongMaterial({
                  color: "#004654",
                  emissive: "#00F",
                  specular: "#00F",
                });
            }
            if (x == -3 && z == 3) {
              (cubo_.children[0].children[0] as THREE.Mesh).material =
                new THREE.MeshPhongMaterial({
                  color: "#003642",
                  emissive: "#00F",
                  specular: "#00F",
                });
            }
            mainObject.add(cubo_);
          }
        }
      };

      const preloadCubo = async () => {
        const group = await loadCubo();
        cloneCube(group);
      };
      preloadCubo();
      animate();

      sceneRef.current.addEventListener("mousemove", (event) => {
        const x = event.clientX - windowHalf.x;
        const y = event.clientY - windowHalf.y;
        rotationObject.rotation.y = x / 50000;
        rotationObject.rotation.x = y / 50000;
        console.log(x, y);
      });
      setLoaded(true);
    }
  }, [sceneRef, loaded]);

  return (
    <div id={id} ref={sceneRef}>
      {children}
    </div>
  );
};

export default Scene;
