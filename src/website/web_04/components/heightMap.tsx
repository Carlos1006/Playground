import { useRef, useCallback, useLayoutEffect, FC } from "react";
import css from "./../styles/main.module.scss";
import cmap from "../../../assets/maps/map1/cmap.png";
import hmap from "../../../assets/maps/map1/hmap.png";
import * as THREE from "three";
import { DegToRad, Random } from "../../../website/web_03/utils";
import { CAM_Z, DEG, POS_Y, SCALE, SIDE } from "../constants";
import { useMainContext } from "../hooks/useMainContext";

const createScene = () => {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog("rgb(5,5,5)", 4, 11);
  // scene.fog = new THREE.Fog("rgb(255,255,255)", 11, 15);
  return scene;
};

const createBar = (x: number, y: number, z: number, height = 1) => {
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
  bar.castShadow = true;
  bar.receiveShadow = true;
  return bar;
};

const createBase = () => {
  const flatCubeGeometry = new THREE.BoxGeometry(10, 5, 10);
  const flatCubeMaterial = new THREE.MeshPhongMaterial({
    color: "rgb(23,23,30)",
    emissive: 0x000000,
    specular: 0x111111,
    shininess: 30,
    refractionRatio: 0.98,
    reflectivity: 1,
  });
  const flatCube = new THREE.Mesh(flatCubeGeometry, flatCubeMaterial);
  flatCube.receiveShadow = true;
  flatCube.castShadow = true;
  flatCube.position.y = -2.5;
  return flatCube;
};

const createCamera = (width: number, height: number) => {
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = CAM_Z;
  camera.rotation.x = DegToRad(DEG);
  return camera;
};

const createRenderer = (width: number, height: number) => {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  renderer.setSize(width, height);
  return renderer;
};

const createAmbientLight = () => {
  const mainLight = new THREE.HemisphereLight(
    "rgb(128,128,128)",
    "rgb(84,85,255)",
    7
  );
  mainLight.position.set(0, 5, 0);
  return mainLight;
};

const createReferenceCube = () => {
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

const createSpotLight = () => {
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
  sphere.position.y = 4;
  sphere.position.x = 1;
  sphere.position.z = 1;
  sphere.add(light);
  return sphere;
};

const HeightMap: FC = () => {
  const {
    camera,
    canvasRef1,
    canvasRef2,
    imgContainerRef1,
    imgContainerRef2,
    clock,
  } = useMainContext();

  const ambientLight = useRef<THREE.HemisphereLight>(
    new THREE.HemisphereLight()
  );
  const renderer = useRef<THREE.WebGLRenderer>(new THREE.WebGLRenderer());
  const mainContainer = useRef<THREE.Group>(new THREE.Group());
  const barsContainer = useRef<THREE.Group>(new THREE.Group());
  const referenceCube = useRef<THREE.Mesh>(new THREE.Mesh());
  const spotLight = useRef<THREE.Mesh>(new THREE.Mesh());
  const scene = useRef<THREE.Scene>(new THREE.Scene());
  const base = useRef<THREE.Mesh>(new THREE.Mesh());
  const renderRef = useRef<HTMLDivElement>(null);
  const barGrid = useRef<THREE.Mesh[][]>([]);
  const speed = useRef<number>(0.2);
  const render = useRef<number>(0);

  const canvasRender1 = useRef<number>(0);
  const canvasRender2 = useRef<number>(0);
  const canvasContext1 = useRef<CanvasRenderingContext2D | null>(null);
  const canvasContext2 = useRef<CanvasRenderingContext2D | null>(null);
  const mapColors = useRef<string[][]>([]);
  const mapHeights = useRef<number[][]>([]);

  const add = useCallback((object: THREE.Object3D) => {
    if (scene.current) {
      scene.current.add(object);
    }
  }, []);

  const animate = useCallback(() => {
    if (camera === null || clock === null) return;
    const delta = clock.current.getDelta();
    requestAnimationFrame(animate);
    barsContainer.current.rotation.y += speed.current * delta;
    renderer.current.render(scene.current, camera.current);
  }, [camera, clock]);

  const construct = useCallback(
    (width: number, height: number) => {
      if (renderRef.current === null || camera === null) {
        return;
      }
      scene.current = createScene();
      camera.current = createCamera(width, height);
      renderer.current = createRenderer(width, height);
      ambientLight.current = createAmbientLight();
      spotLight.current = createSpotLight();
      referenceCube.current = createReferenceCube();
      base.current = createBase();

      barsContainer.current.add(base.current);
      let x = 0;
      for (let i = -4.67; i < 4.67; i += 0.1, x++) {
        let y = 0;
        for (let j = -4.67; j < 4.67; j += 0.1, y++) {
          const bar = createBar(i, 0, j, Random(0.5, 1.5));
          barsContainer.current.add(bar);
          if (Array.isArray(barGrid.current[x]) === false) {
            barGrid.current[x] = [];
          }
          barGrid.current[x][y] = bar;
        }
      }
      console.log(barGrid.current);

      // mainContainer.add(referenceCube.current);
      mainContainer.current.add(spotLight.current);
      mainContainer.current.add(ambientLight.current);
      mainContainer.current.add(barsContainer.current);
      // mainContainer.current.rotation.x = DegToRad(25); // 30
      mainContainer.current.position.y = POS_Y;
      mainContainer.current.scale.set(SCALE, SCALE, SCALE);
      add(mainContainer.current);
      renderRef.current.appendChild(renderer.current.domElement);
      animate();
    },
    [add, animate, camera]
  );

  const changeBarColors = useCallback(() => {
    barGrid.current.forEach((row, x) => {
      row.forEach((bar, y) => {
        const color1 = mapColors.current[x][y];
        const barMaterial = new THREE.MeshPhongMaterial({
          color: color1,
          emissive: 0x000000,
          specular: 0x111111,
          shininess: 30,
          refractionRatio: 0.5,
          reflectivity: 0.5,
        });
        bar.material = barMaterial;
      });
    });
  }, []);

  const changeBarHeight = useCallback(() => {
    barGrid.current.forEach((row, x) => {
      row.forEach((bar, y) => {
        const height = mapHeights.current[x][y];
        bar.geometry = new THREE.BoxGeometry(0.1, height / 70, 0.1);
      });
    });
  }, []);

  useLayoutEffect(() => {
    render.current = render.current + 1;
    if (renderRef.current && render.current === 1) {
      const { clientHeight: height, clientWidth: width } = renderRef.current;
      construct(width, height);
    }
  }, [renderRef, render, construct]);

  useLayoutEffect(() => {
    const drawColorMap = async () => {
      if (canvasRef1 === null || imgContainerRef1 === null) {
        return;
      }
      if (canvasRef1.current && imgContainerRef1.current) {
        canvasContext1.current = canvasRef1.current.getContext("2d");
        canvasRef1.current.width = SIDE;
        canvasRef1.current.height = SIDE;
        const image = new Image();
        image.src = cmap;
        await new Promise((resolve) => {
          image.onload = () => {
            resolve(true);
          };
        });
        if (canvasContext1.current) {
          canvasContext1.current?.drawImage(image, 0, 0, SIDE, SIDE);
          const dataOrigin = canvasContext1.current.getImageData(
            0,
            0,
            SIDE,
            SIDE
          );
          const dataDestiny = canvasContext1.current.createImageData(
            SIDE,
            SIDE
          );
          const colors: string[][] = [];
          let xx = 0;
          let yy = 0;
          for (let x = 0; x < SIDE; x += 4) {
            yy = 0;
            for (let y = 0; y < SIDE; y += 4) {
              // getPixels in a 4x4 square
              const pixels: Uint8ClampedArray[][] = [];
              for (let i = 0; i < 4; i++) {
                pixels[i] = [];
                for (let j = 0; j < 4; j++) {
                  // if pixel is out of bounds, set it to black
                  if (x + i >= SIDE || y + j >= SIDE) {
                    pixels[i][j] = new Uint8ClampedArray([0, 0, 0, 0]);
                    continue;
                  }
                  const iPixel = (x + i + (y + j) * SIDE) * 4;
                  const pixel = dataOrigin.data.slice(iPixel, iPixel + 4);
                  pixels[i][j] = pixel;
                }
              }
              // get average color
              let r = 0;
              let g = 0;
              let b = 0;
              let counter = 0;
              pixels.forEach((row) => {
                row.forEach((pixel) => {
                  if (pixel[3] === 0) {
                    return;
                  }
                  r += pixel[0];
                  g += pixel[1];
                  b += pixel[2];
                  counter++;
                });
              });
              r /= counter;
              g /= counter;
              b /= counter;
              r = Math.round(r);
              g = Math.round(g);
              b = Math.round(b);
              const color = `rgb(${r},${g},${b})`;
              // set pixels in destiny
              for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                  if (x + i >= SIDE || y + j >= SIDE) {
                    continue;
                  }
                  const iPixel = (x + i + (y + j) * SIDE) * 4;
                  dataDestiny.data[iPixel] = r;
                  dataDestiny.data[iPixel + 1] = g;
                  dataDestiny.data[iPixel + 2] = b;
                  dataDestiny.data[iPixel + 3] = 255;
                }
              }
              if (!Array.isArray(colors[xx])) {
                colors[xx] = [];
              }
              colors[xx][yy] = color;
              yy++;
            }
            xx++;
          }
          mapColors.current = colors;
          canvasContext1.current.putImageData(dataDestiny, 0, 0);
          console.log(mapColors.current);
          changeBarColors();
        }
      }
    };
    canvasRender1.current = canvasRender1.current + 1;
    if (canvasRender1.current === 1) {
      drawColorMap();
    }
  }, [canvasRef1, imgContainerRef1, canvasRender1, changeBarColors]);

  useLayoutEffect(() => {
    const drawHeightMap = async () => {
      if (canvasRef2 === null || imgContainerRef2 === null) {
        return;
      }
      if (canvasRef2.current && imgContainerRef2.current) {
        canvasContext2.current = canvasRef2.current.getContext("2d");
        canvasRef2.current.width = SIDE;
        canvasRef2.current.height = SIDE;
        const image = new Image();
        image.src = hmap;
        await new Promise((resolve) => {
          image.onload = () => {
            resolve(true);
          };
        });
        if (canvasContext2.current) {
          canvasContext2.current?.drawImage(image, 0, 0, SIDE, SIDE);
          const dataOrigin = canvasContext2.current.getImageData(
            0,
            0,
            SIDE,
            SIDE
          );
          const dataDestiny = canvasContext2.current.createImageData(
            SIDE,
            SIDE
          );
          const colors: number[][] = [];
          let xx = 0;
          let yy = 0;
          for (let x = 0; x < SIDE; x += 4) {
            yy = 0;
            for (let y = 0; y < SIDE; y += 4) {
              // getPixels in a 4x4 square
              const pixels: Uint8ClampedArray[][] = [];
              for (let i = 0; i < 4; i++) {
                pixels[i] = [];
                for (let j = 0; j < 4; j++) {
                  // if pixel is out of bounds, set it to black
                  if (x + i >= SIDE || y + j >= SIDE) {
                    pixels[i][j] = new Uint8ClampedArray([0, 0, 0, 0]);
                    continue;
                  }
                  const iPixel = (x + i + (y + j) * SIDE) * 4;
                  const pixel = dataOrigin.data.slice(iPixel, iPixel + 4);
                  pixels[i][j] = pixel;
                }
              }
              // get average color
              let r = 0;
              let g = 0;
              let b = 0;
              let counter = 0;
              pixels.forEach((row) => {
                row.forEach((pixel) => {
                  if (pixel[3] === 0) {
                    return;
                  }
                  r += pixel[0];
                  g += pixel[1];
                  b += pixel[2];
                  counter++;
                });
              });
              r /= counter;
              g /= counter;
              b /= counter;
              const newHeight = (r + g + b) / 3;
              // set pixels in destiny
              for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                  if (x + i >= SIDE || y + j >= SIDE) {
                    continue;
                  }
                  const iPixel = (x + i + (y + j) * SIDE) * 4;
                  dataDestiny.data[iPixel] = r;
                  dataDestiny.data[iPixel + 1] = g;
                  dataDestiny.data[iPixel + 2] = b;
                  dataDestiny.data[iPixel + 3] = 255;
                }
              }
              if (!Array.isArray(colors[xx])) {
                colors[xx] = [];
              }
              colors[xx][yy] = newHeight;
              yy++;
            }
            xx++;
          }
          mapHeights.current = colors;
          canvasContext2.current.putImageData(dataDestiny, 0, 0);
          changeBarHeight();
        }
      }
    };
    canvasRender2.current = canvasRender2.current + 1;
    if (canvasRender2.current === 1) {
      drawHeightMap();
    }
  }, [
    canvasRef1,
    imgContainerRef1,
    canvasRender1,
    changeBarHeight,
    canvasRef2,
    imgContainerRef2,
  ]);

  return <div id={css.render} ref={renderRef}></div>;
};

export default HeightMap;
