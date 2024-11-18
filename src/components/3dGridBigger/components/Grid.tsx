import React, { useRef, useEffect } from "react";
import css from "../../../styles/grid.module.scss";
import cmap from "../../../assets/maps/map1/cmap.png";
import hmap from "../../../assets/maps/map1/hmap.png";
import * as THREE from "three";
import { DegToRad } from "../../../website/web_03/utils";
import { IGrid, IImage, IMesh } from "../types";
import {
  createScene,
  createCamera,
  createRenderer,
  createAmbientLight,
  createSpotLight,
  createReferenceCube,
  createBase,
  createPixelMatrix,
  getPixel,
} from "../utils";

// Calcula el total de barras
const gridSize = 10; // 4.6 * 2
const step = 0.1;
const side = Math.floor(gridSize / step);
const totalBars = side ** 2;

const Grid: React.FC<IGrid> = ({ showCase = false }: IGrid) => {
  const renderRef = useRef<HTMLDivElement>(null);
  const imgContainerRef1 = useRef<HTMLDivElement>(null);
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const imgContainerRef2 = useRef<HTMLDivElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const canvasContext1 = useRef<CanvasRenderingContext2D | null>(null);
  const canvasContext2 = useRef<CanvasRenderingContext2D | null>(null);
  const scene = useRef<THREE.Scene>(new THREE.Scene());
  const base = useRef<THREE.Mesh>(new THREE.Mesh());
  const barGridMesh = useRef<IMesh[][]>([]);
  const instanceMeshRef = useRef<THREE.InstancedMesh | null>(null);
  const ambientLight = useRef<THREE.HemisphereLight>(
    new THREE.HemisphereLight()
  );
  const camera = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera());
  const renderer = useRef<THREE.WebGLRenderer>(new THREE.WebGLRenderer());
  const mainContainer = useRef<THREE.Group>(new THREE.Group());
  const barsContainer = useRef<THREE.Group>(new THREE.Group());
  const referenceCube = useRef<THREE.Mesh>(new THREE.Mesh());
  const spotLight = useRef<THREE.Mesh>(new THREE.Mesh());
  const clock = useRef<THREE.Clock>(new THREE.Clock());
  const frame = useRef<number>(0);
  const speed = useRef<number>(0.15);

  const destination = useRef<IImage | null>(null);

  useEffect(() => {
    const add = (...object: THREE.Object3D[]): void => {
      object.forEach((o) => scene.current.add(o));
    };

    const animate = (): void => {
      frame.current = requestAnimationFrame(animate);
      const delta = clock.current.getDelta();
      barsContainer.current.rotation.y += speed.current * delta;

      renderer.current.render(scene.current, camera.current);
    };

    const construct = (width: number, height: number): void => {
      scene.current = createScene();
      camera.current = createCamera(width, height);
      renderer.current = createRenderer(width, height);
      ambientLight.current = createAmbientLight();
      spotLight.current = createSpotLight();
      referenceCube.current = createReferenceCube();
      base.current = createBase();
      const barGeometry = new THREE.BoxGeometry(0.1, 1, 0.1);
      const barMaterial = new THREE.MeshPhongMaterial({
        color: "rgb(255,255,255)",
        // color: "rgb(47,180,200)",
        emissive: 0x000000,
        specular: 0x111111,
        shininess: 30,
        refractionRatio: 0.5,
        reflectivity: 0.5,
      });

      const colors = new Float32Array(totalBars * 3); // RGB por instancia

      // Crea un InstancedMesh
      const instancedMesh = new THREE.InstancedMesh(
        barGeometry,
        barMaterial,
        totalBars
      );

      let instanceId = 0;
      const matrix = new THREE.Matrix4();

      const { width: destinyCurrent } = destination.current ?? { width: 0 };
      const between10 = (destinyCurrent - 1) / 10;
      const half = Number((between10 / 2).toFixed(1));
      const module = between10 % 2;

      let begin = -1 * half;
      let end = half;
      if (module === 1) {
        begin = -1 * half - 0.5;
        end = half + 0.5;
      }

      let x = 0;
      for (let i = begin; i < end; i += step, x++) {
        let y = 0;
        for (let j = begin; j < end; j += step, y++) {
          const realColor = destination.current?.pixels[x][y] ?? {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
            h: 0,
          };

          // Configura la posición y escala (altura)
          const height = realColor.h; //Math.random() * (1.5 - 0.5) + 0.5;
          const position = new THREE.Vector3(i, height / 2, j); // Centra la barra en su base
          const scale = new THREE.Vector3(1, height, 1);

          // Actualiza la matriz para esta instancia
          matrix.compose(position, new THREE.Quaternion(), scale);
          instancedMesh.setMatrixAt(instanceId, matrix);

          const colorString = `rgb(${realColor.r},${realColor.g},${realColor.b})`;
          const color = new THREE.Color(colorString); // RGB inicial
          color.toArray(colors, instanceId * 3); // Guardar en el buffer

          // Opcional: Guarda la referencia en `barGridMesh`
          if (!Array.isArray(barGridMesh.current[x])) {
            barGridMesh.current[x] = [];
          }
          barGridMesh.current[x][y] = {
            id: instanceId,
            height: Number(height),
          };

          instanceId++;
        }
      }

      instancedMesh.instanceMatrix.needsUpdate = true;
      instancedMesh.instanceColor = new THREE.InstancedBufferAttribute(
        colors,
        3
      );
      instanceMeshRef.current = instancedMesh;
      barsContainer.current.add(instancedMesh);

      mainContainer.current.add(spotLight.current);
      mainContainer.current.add(ambientLight.current);
      mainContainer.current.add(barsContainer.current);
      mainContainer.current.rotation.x = DegToRad(40); // 30
      add(mainContainer.current);
      renderRef?.current?.appendChild(renderer.current.domElement);
      animate();
    };

    const draw = async (): Promise<void> => {
      if (
        canvasRef1.current &&
        imgContainerRef1.current &&
        canvasRef2.current &&
        imgContainerRef2.current
      ) {
        canvasContext1.current = canvasRef1.current.getContext("2d");
        canvasContext2.current = canvasRef2.current.getContext("2d");
        let imgDims = { w: 0, h: 0 };

        const colorImage = new Image();
        colorImage.src = cmap;
        await new Promise((resolve) => {
          colorImage.onload = (): void => {
            resolve(true);
            if (canvasRef1.current) {
              imgDims = { w: colorImage.width, h: colorImage.height };
            }
          };
        });

        const heightImage = new Image();
        heightImage.src = hmap;
        await new Promise((resolve) => {
          heightImage.onload = (): void => {
            resolve(true);
          };
        });

        canvasRef1.current.width = imgDims.w;
        canvasRef1.current.height = imgDims.h;
        canvasRef2.current.width = imgDims.w;
        canvasRef2.current.height = imgDims.h;

        if (canvasContext1.current && canvasContext2.current) {
          canvasContext1.current?.drawImage(
            colorImage,
            0,
            0,
            imgDims.w,
            imgDims.h
          );
          canvasContext2.current?.drawImage(
            heightImage,
            0,
            0,
            imgDims.w,
            imgDims.h
          );

          const colorOrigin = canvasContext1.current.getImageData(
            0,
            0,
            imgDims.w,
            imgDims.h
          );
          const heightOrigin = canvasContext2.current.getImageData(
            0,
            0,
            imgDims.w,
            imgDims.h
          );

          const colorMatrix = createPixelMatrix(colorOrigin);
          const heightMatrix = createPixelMatrix(heightOrigin);

          const destiny: IImage = {
            pixels: [],
            width: Math.floor(imgDims.w / 5),
            height: Math.floor(imgDims.h / 5),
          };
          const step = 5;
          let currentX = 0;

          for (let x = 0; x < colorMatrix.width; x += step, currentX++) {
            destiny.pixels[currentX] = [];
            for (
              let y = 0, currentY = 0;
              y < colorMatrix.height;
              y += step, currentY++
            ) {
              const maskSize = step ** 2;
              const colorAccum = { r: 0, g: 0, b: 0, a: 0 };
              let heightAccum = 0;

              for (let i = 0; i < step; i++) {
                for (let j = 0; j < step; j++) {
                  const xx = x + i;
                  const yy = y + j;
                  const color = getPixel(colorMatrix, xx, yy);
                  const height = getPixel(heightMatrix, xx, yy);
                  colorAccum.r += color.r;
                  colorAccum.g += color.g;
                  colorAccum.b += color.b;
                  colorAccum.a += color.a;
                  heightAccum += height.r;
                }
              }

              const newColor = {
                r: Math.round(colorAccum.r / maskSize),
                g: Math.round(colorAccum.g / maskSize),
                b: Math.round(colorAccum.b / maskSize),
                a: Math.round(colorAccum.a / maskSize),
                h: heightAccum / maskSize / 150,
              };
              destiny.pixels[currentX][currentY] = newColor;
            }
          }

          destination.current = destiny;
          const { clientHeight: height, clientWidth: width } =
            renderRef.current ?? { clientHeight: 0, clientWidth: 0 };
          construct(width, height);
        }
      }
    };

    if (canvasRef1.current && canvasRef2.current && renderRef.current) {
      draw();
    }

    const barsContainerRef = barsContainer.current;
    const mainContainerRef = mainContainer.current;
    const renderRefRef = renderRef.current;
    const instancedMeshRefRef = instanceMeshRef.current;

    return (): void => {
      cancelAnimationFrame(frame.current);
      mainContainerRef.remove(barsContainerRef);
      mainContainerRef.remove(ambientLight.current);
      mainContainerRef.remove(spotLight.current);
      mainContainerRef.remove(referenceCube.current);
      scene.current.remove(mainContainerRef);
      instancedMeshRefRef && barsContainerRef.remove(instancedMeshRefRef);
      renderRefRef?.removeChild(renderer.current.domElement);
    };
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
