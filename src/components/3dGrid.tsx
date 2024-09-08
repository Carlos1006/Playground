import React, { useRef, useCallback, useLayoutEffect, RefObject } from "react";
import css from "../styles/grid.module.scss";
import cmap from "../assets/maps/map1/cmap.png";
import hmap from "../assets/maps/map1/hmap.png";
import * as THREE from "three";
import { DegToRad, Random } from "../website/web_03/utils";

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
  camera.position.z = 5;
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

const Grid: React.FC = () => {
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
  const speed = useRef<number>(0.1);
  const render = useRef<number>(0);

  const imgContainerRef1 = useRef<HTMLDivElement>(null);
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRender1 = useRef<number>(0);

  const imgContainerRef2 = useRef<HTMLDivElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const canvasRender2 = useRef<number>(0);

  const canvasContext1 = useRef<CanvasRenderingContext2D | null>(null);
  const canvasContext2 = useRef<CanvasRenderingContext2D | null>(null);

  // drag
  const draggerRef = useRef<HTMLDivElement>(null);
  const draggerRef2 = useRef<HTMLDivElement>(null);
  const mouseDown = useRef<boolean>(false);
  const draggerPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const offset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const innerCanvas1 = useRef<HTMLCanvasElement>(null);
  const innerCanvas2 = useRef<HTMLCanvasElement>(null);
  const innerCanvas1Context = useRef<CanvasRenderingContext2D | null>(null);
  const innerCanvas2Context = useRef<CanvasRenderingContext2D | null>(null);

  const colors1 = useRef<string[][]>([]);
  const colors2 = useRef<number[][]>([]);

  const add = useCallback((object: THREE.Object3D) => {
    if (scene.current) {
      scene.current.add(object);
    }
  }, []);

  const animate = useCallback(() => {
    const delta = clock.current.getDelta();
    requestAnimationFrame(animate);
    // cube.rotation.y += 0.8 * delta;
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
      for (let i = -2.5; i < 2.5; i += 0.1, x++) {
        let y = 0;
        for (let j = -2.5; j < 2.5; j += 0.1, y++) {
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
      mainContainer.current.rotation.x = DegToRad(30); // 25 20
      add(mainContainer.current);
      renderRef.current.appendChild(renderer.current.domElement);
      animate();
    },
    [add, animate]
  );

  // const changeMaterial = useCallback(() => {
  //   const bar =
  //     barGrid.current[Math.floor(Random(0, barGrid.current.length))][
  //       Math.floor(Random(0, barGrid.current[0].length))
  //     ];
  //   const barMaterial = new THREE.MeshPhongMaterial({
  //     color: `rgb(${Math.floor(Random(0, 255))},${Math.floor(
  //       Random(0, 255)
  //     )},${Math.floor(Random(0, 255))})`,
  //     emissive: 0x000000,
  //     specular: 0x111111,
  //     shininess: 30,
  //     refractionRatio: 0.5,
  //     reflectivity: 0.5,
  //   });
  //   bar.material = barMaterial;
  // }, []);

  // const changeSpeed = useCallback(() => {
  //   speed.current = Random(0.1, 0.5);
  // }, []);

  // Drag events

  useLayoutEffect(() => {
    render.current = render.current + 1;
    if (renderRef.current && render.current === 1) {
      const { clientHeight: height, clientWidth: width } = renderRef.current;
      construct(width, height);
    }
  }, [renderRef, render, construct]);

  useLayoutEffect(() => {
    canvasRender1.current = canvasRender1.current + 1;
    if (
      canvasRef1.current &&
      imgContainerRef1.current &&
      canvasRender1.current === 1
    ) {
      const { clientWidth: width } = imgContainerRef1.current;
      imgContainerRef1.current.style.height = `${width}px`;
      canvasRef1.current.width = width;
      canvasRef1.current.height = width;
      const ctx = canvasRef1.current.getContext("2d");
      if (ctx) {
        canvasContext1.current = ctx;
        const image = new Image();
        image.src = cmap;
        image.onload = (): void => {
          ctx.drawImage(image, 0, 0, width, width);
        };
      }
    }
  }, [canvasRef1, imgContainerRef1, canvasRender1]);

  useLayoutEffect(() => {
    canvasRender2.current = canvasRender2.current + 1;
    if (
      canvasRef2.current &&
      imgContainerRef2.current &&
      canvasRender2.current === 1
    ) {
      const { clientWidth: width } = imgContainerRef2.current;
      imgContainerRef2.current.style.height = `${width}px`;
      canvasRef2.current.width = width;
      canvasRef2.current.height = width;
      const ctx = canvasRef2.current.getContext("2d");
      if (ctx) {
        canvasContext2.current = ctx;
        const image = new Image();
        image.src = hmap;
        image.onload = (): void => {
          ctx.drawImage(image, 0, 0, width, width);
        };
      }
    }
  }, [canvasRef1, imgContainerRef1, canvasRender1]);

  const changeBarColors = useCallback(() => {
    console.log("change bar colors", colors1.current);
    barGrid.current.forEach((row, x) => {
      row.forEach((bar, y) => {
        const color1 = colors1.current[x][y];
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
    console.log("change bar height", colors2.current);
    barGrid.current.forEach((row, x) => {
      row.forEach((bar, y) => {
        const height = colors2.current[x][y];
        bar.geometry = new THREE.BoxGeometry(0.1, height / 70, 0.1);
      });
    });
  }, []);

  useLayoutEffect(() => {
    if (innerCanvas1.current && draggerRef.current) {
      innerCanvas1.current.width = draggerRef.current.clientWidth;
      innerCanvas1.current.height = draggerRef.current.clientHeight;
      const ctx = innerCanvas1.current.getContext("2d");
      if (ctx) {
        innerCanvas1Context.current = ctx;
      }
    }
  }, [innerCanvas1, draggerRef]);

  useLayoutEffect(() => {
    if (innerCanvas2.current && draggerRef2.current) {
      const ctx = innerCanvas2.current.getContext("2d");
      innerCanvas2.current.width = draggerRef2.current.clientWidth;
      innerCanvas2.current.height = draggerRef2.current.clientHeight;
      if (ctx) {
        innerCanvas2Context.current = ctx;
      }
    }
  }, [innerCanvas2]);

  const onMouseDown = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      ref: RefObject<HTMLDivElement>
    ) => {
      if (ref.current) {
        const { clientX, clientY } = e;
        const { offsetLeft, offsetTop } = ref.current;
        offset.current = { x: clientX - offsetLeft, y: clientY - offsetTop };
      }
      mouseDown.current = true;
    },
    []
  );

  const draw = useCallback(() => {
    // draw the section from the canvas into the inner canvas
    innerCanvas1Context.current?.drawImage(
      canvasRef1.current as HTMLCanvasElement,
      draggerPosition.current.x,
      draggerPosition.current.y,
      draggerRef.current?.clientWidth as number,
      draggerRef.current?.clientHeight as number,
      0,
      0,
      innerCanvas1.current?.clientWidth as number,
      innerCanvas1.current?.clientHeight as number
    );

    innerCanvas2Context.current?.drawImage(
      canvasRef2.current as HTMLCanvasElement,
      draggerPosition.current.x,
      draggerPosition.current.y,
      draggerRef.current?.clientWidth as number,
      draggerRef.current?.clientHeight as number,
      0,
      0,
      innerCanvas2.current?.clientWidth as number,
      innerCanvas2.current?.clientHeight as number
    );

    // extract colors from inner canvas and store in a 2d array
    if (innerCanvas1.current && innerCanvas1Context.current) {
      const colors: string[][] = [];
      for (let i = 0; i < innerCanvas1.current.clientWidth; i++) {
        colors[i] = [];
        for (let j = 0; j < innerCanvas1.current?.clientHeight; j++) {
          const [r, g, b] = innerCanvas1Context.current.getImageData(
            i,
            j,
            1,
            1
          ).data;
          if (!Array.isArray(colors[i])) {
            colors[i] = [];
          }
          colors[i][j] = `rgb(${r},${g},${b})`;
        }
      }
      colors1.current = colors;
      changeBarColors();
    }

    if (innerCanvas2.current && innerCanvas2Context.current) {
      const colors: number[][] = [];
      for (let i = 0; i < innerCanvas2.current.clientWidth; i++) {
        colors[i] = [];
        for (let j = 0; j < innerCanvas2.current?.clientHeight; j++) {
          const [r] = innerCanvas2Context.current.getImageData(i, j, 1, 1).data;
          if (!Array.isArray(colors[i])) {
            colors[i] = [];
          }
          colors[i][j] = r;
        }
      }
      colors2.current = colors;
      changeBarHeight();
    }
  }, [changeBarColors, changeBarHeight]);

  const onMouseUp = useCallback(() => {
    mouseDown.current = false;
    draw();
  }, [draw]);

  const drag = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      dragRef: RefObject<HTMLDivElement>,
      imgContainerRef: RefObject<HTMLDivElement>
    ) => {
      if (
        mouseDown.current &&
        draggerRef.current &&
        draggerRef2.current &&
        dragRef.current &&
        imgContainerRef.current
      ) {
        const { clientX, clientY } = e;
        const { x: offsetX, y: offsetY } = offset.current;
        let newX = clientX - offsetX;
        let newY = clientY - offsetY;

        if (newY < 0) {
          newY = 0;
        }
        if (
          newY >
          imgContainerRef.current.clientHeight - dragRef.current.clientHeight
        ) {
          newY =
            imgContainerRef.current.clientHeight - dragRef.current.clientHeight;
        }
        if (newX < 0) {
          newX = 0;
        }
        if (
          newX >
          imgContainerRef.current.clientWidth - dragRef.current.clientWidth
        ) {
          newX =
            imgContainerRef.current.clientWidth - dragRef.current.clientWidth;
        }
        draggerPosition.current = { x: newX, y: newY };

        draggerRef.current.style.left = `${newX}px`;
        draggerRef.current.style.top = `${newY}px`;
        draggerRef2.current.style.left = `${newX}px`;
        draggerRef2.current.style.top = `${newY}px`;
      }
    },
    [mouseDown, offset]
  );

  return (
    <div id={css.grid}>
      <div className={css.column}>
        <div
          className={css.imageContainer}
          ref={imgContainerRef1}
          onMouseMove={(e): void => drag(e, draggerRef, imgContainerRef1)}
        >
          <div
            ref={draggerRef}
            className={css.dragger}
            onMouseDown={(e): void => onMouseDown(e, draggerRef)}
            onMouseUp={onMouseUp}
          >
            <canvas ref={innerCanvas1} />
          </div>
          <canvas ref={canvasRef1} />
        </div>
        <div
          className={css.imageContainer}
          ref={imgContainerRef2}
          onMouseMove={(e): void => drag(e, draggerRef2, imgContainerRef2)}
        >
          <div
            ref={draggerRef2}
            className={css.dragger}
            onMouseDown={(e): void => onMouseDown(e, draggerRef2)}
            onMouseUp={onMouseUp}
          >
            <canvas ref={innerCanvas2} />
          </div>
          <canvas ref={canvasRef2} />
        </div>
      </div>
      <div className={css.column}>
        <div id={css.render} ref={renderRef}></div>
      </div>
    </div>
  );
};

export default Grid;
