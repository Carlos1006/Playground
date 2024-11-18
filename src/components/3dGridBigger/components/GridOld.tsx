import React, { useRef, useCallback, useEffect } from "react";
import css from "../styles/grid.module.scss";
import cmap from "../assets/maps/map1/cmap.png";
import hmap from "../assets/maps/map1/hmap.png";
import * as THREE from "three";
import { DegToRad, Random } from "../../../website/web_03/utils";

const createScene = (): THREE.Scene => {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x222244, 50, 100);
  return scene;
};

const createBar = (x: number, y: number, z: number, height = 1): THREE.Mesh => {
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

const createBase = (): THREE.Mesh => {
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
  flatCube.receiveShadow = true;
  flatCube.castShadow = true;
  flatCube.position.y = -2.8;
  return flatCube;
};

const createCamera = (
  width: number,
  height: number
): THREE.PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 7;
  return camera;
};

const createRenderer = (width: number, height: number): THREE.WebGLRenderer => {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  renderer.setSize(width, height);
  return renderer;
};

const createAmbientLight = (): THREE.HemisphereLight => {
  const mainLight = new THREE.HemisphereLight(
    "rgb(128,128,128)",
    "rgb(84,85,255)",
    7
  );
  mainLight.position.set(0, 5, 0);
  return mainLight;
};

const createReferenceCube = (): THREE.Mesh => {
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

const createSpotLight = (): THREE.Mesh => {
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
};

interface IGrid {
  showCase?: boolean;
}

const Grid: React.FC<IGrid> = ({ showCase = false }: IGrid) => {
  const ambientLight = useRef<THREE.HemisphereLight>(
    new THREE.HemisphereLight()
  );
  const camera = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera());
  const renderer = useRef<THREE.WebGLRenderer>(new THREE.WebGLRenderer());
  const mainContainer = useRef<THREE.Group>(new THREE.Group());
  const barsContainer = useRef<THREE.Group>(new THREE.Group());
  const referenceCube = useRef<THREE.Mesh>(new THREE.Mesh());
  const spotLight = useRef<THREE.Mesh>(new THREE.Mesh());
  const scene = useRef<THREE.Scene>(new THREE.Scene());
  const clock = useRef<THREE.Clock>(new THREE.Clock());
  const base = useRef<THREE.Mesh>(new THREE.Mesh());
  const renderRef = useRef<HTMLDivElement>(null);
  const barGrid = useRef<THREE.Mesh[][]>([]);
  const speed = useRef<number>(0.15);
  const render = useRef<number>(0);
  const frame = useRef<number>(0);

  const imgContainerRef1 = useRef<HTMLDivElement>(null);
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRender1 = useRef<number>(0);

  const imgContainerRef2 = useRef<HTMLDivElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
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
    const delta = clock.current.getDelta();
    frame.current = requestAnimationFrame(animate);
    barsContainer.current.rotation.y += speed.current * delta;
    renderer.current.render(scene.current, camera.current);
  }, []);

  const construct = useCallback(
    (width: number, height: number) => {
      if (renderRef.current === null) {
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
      for (let i = -4.6; i < 4.6; i += 0.1, x++) {
        let y = 0;
        for (let j = -4.6; j < 4.6; j += 0.1, y++) {
          const bar = createBar(i, 0, j, Random(0.5, 1.5));
          barsContainer.current.add(bar);
          if (Array.isArray(barGrid.current[x]) === false) {
            barGrid.current[x] = [];
          }
          barGrid.current[x][y] = bar;
        }
      }

      // mainContainer.add(referenceCube.current);
      mainContainer.current.add(spotLight.current);
      mainContainer.current.add(ambientLight.current);
      mainContainer.current.add(barsContainer.current);
      mainContainer.current.rotation.x = DegToRad(40); // 30
      add(mainContainer.current);
      renderRef.current.appendChild(renderer.current.domElement);
      animate();
    },
    [add, animate]
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

  useEffect(() => {
    render.current = render.current + 1;
    if (renderRef.current && render.current === 1) {
      const { clientHeight: height, clientWidth: width } = renderRef.current;
      construct(width, height);
    }
  }, [renderRef, render, construct]);

  useEffect(() => {
    const drawColorMap = async (): Promise<void> => {
      if (canvasRef1.current && imgContainerRef1.current) {
        canvasContext1.current = canvasRef1.current.getContext("2d");
        // imgContainerRef1.current.style.height = `${height}px`;
        const image = new Image();
        image.src = cmap;
        let imageRealDimensions = { w: 0, h: 0 };
        await new Promise((resolve) => {
          image.onload = (): void => {
            resolve(true);
            if (canvasRef1.current) {
              imageRealDimensions = { w: image.width, h: image.height };
            }
          };
        });
        canvasRef1.current.width = imageRealDimensions.w;
        canvasRef1.current.height = imageRealDimensions.h;
        if (canvasContext1.current) {
          canvasContext1.current?.drawImage(
            image,
            0,
            0,
            imageRealDimensions.w,
            imageRealDimensions.h
          );
          const dataOrigin = canvasContext1.current.getImageData(
            0,
            0,
            imageRealDimensions.w,
            imageRealDimensions.h
          );
          const dataDestiny = canvasContext1.current.createImageData(
            imageRealDimensions.w,
            imageRealDimensions.h
          );
          const colors: string[][] = [];
          let xx = 0;
          let yy = 0;
          for (let x = 0; x < imageRealDimensions.w; x += 4) {
            yy = 0;
            for (let y = 0; y < imageRealDimensions.h; y += 4) {
              // getPixels in a 4x4 square
              const pixels: Uint8ClampedArray[][] = [];
              for (let i = 0; i < 4; i++) {
                pixels[i] = [];
                for (let j = 0; j < 4; j++) {
                  // if pixel is out of bounds, set it to black
                  if (
                    x + i >= imageRealDimensions.w ||
                    y + j >= imageRealDimensions.h
                  ) {
                    pixels[i][j] = new Uint8ClampedArray([0, 0, 0, 0]);
                    continue;
                  }
                  const iPixel = (x + i + (y + j) * imageRealDimensions.w) * 4;
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
                  if (
                    x + i >= imageRealDimensions.w ||
                    y + j >= imageRealDimensions.h
                  ) {
                    continue;
                  }
                  const iPixel = (x + i + (y + j) * imageRealDimensions.w) * 4;
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

  useEffect(() => {
    const drawHeightMap = async (): Promise<void> => {
      if (canvasRef2.current && imgContainerRef2.current) {
        canvasContext2.current = canvasRef2.current.getContext("2d");

        const image = new Image();
        image.src = hmap;
        let imageRealDimensions = { w: 0, h: 0 };
        await new Promise((resolve) => {
          image.onload = (): void => {
            imageRealDimensions = { w: image.width, h: image.height };
            resolve(true);
          };
        });
        if (canvasContext2.current) {
          canvasRef2.current.width = imageRealDimensions.w;
          canvasRef2.current.height = imageRealDimensions.h;
          canvasContext2.current?.drawImage(
            image,
            0,
            0,
            imageRealDimensions.w,
            imageRealDimensions.h
          );
          const dataOrigin = canvasContext2.current.getImageData(
            0,
            0,
            imageRealDimensions.w,
            imageRealDimensions.h
          );
          const dataDestiny = canvasContext2.current.createImageData(
            imageRealDimensions.w,
            imageRealDimensions.h
          );
          const colors: number[][] = [];
          let xx = 0;
          let yy = 0;
          for (let x = 0; x < imageRealDimensions.w; x += 4) {
            yy = 0;
            for (let y = 0; y < imageRealDimensions.h; y += 4) {
              // getPixels in a 4x4 square
              const pixels: Uint8ClampedArray[][] = [];
              for (let i = 0; i < 4; i++) {
                pixels[i] = [];
                for (let j = 0; j < 4; j++) {
                  // if pixel is out of bounds, set it to black
                  if (
                    x + i >= imageRealDimensions.w ||
                    y + j >= imageRealDimensions.h
                  ) {
                    pixels[i][j] = new Uint8ClampedArray([0, 0, 0, 0]);
                    continue;
                  }
                  const iPixel = (x + i + (y + j) * imageRealDimensions.w) * 4;
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
                  if (
                    x + i >= imageRealDimensions.w ||
                    y + j >= imageRealDimensions.h
                  ) {
                    continue;
                  }
                  const iPixel = (x + i + (y + j) * imageRealDimensions.w) * 4;
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
  }, [canvasRef1, imgContainerRef1, canvasRender1, changeBarHeight]);

  useEffect(() => {
    console.log({ canvasContext1, canvasContext2 });
  }, []);

  return (
    <div id={css.grid} className={showCase ? css.showCase : ""}>
      <div className={css.column}>
        <div className={css.imageContainer} ref={imgContainerRef1}>
          <canvas ref={canvasRef1} style={{ width: "100%" }} />
        </div>
        <div className={css.imageContainer} ref={imgContainerRef2}>
          <canvas ref={canvasRef2} style={{ width: "100%" }} />
        </div>
      </div>
      <div className={css.column}>
        <div id={css.render} ref={renderRef} />
      </div>
    </div>
  );
};

export default Grid;
