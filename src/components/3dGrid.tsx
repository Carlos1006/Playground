import React, { useRef, useCallback, useLayoutEffect, RefObject } from "react";
import css from "../styles/grid.module.scss";
import cmap from "../assets/maps/map1/cmap.png";
import hmap from "../assets/maps/map1/hmap.png";
import * as THREE from "three";
import { DegToRad, Random } from "../website/web_03/utils";

const createScene = () => {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x222244, 50, 100);
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
  const flatCubeGeometry = new THREE.BoxGeometry(5.3, 1, 5.3);
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
  flatCube.position.y = -0.5;
  return flatCube;
};

const createCamera = (width: number, height: number) => {
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;
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
  sphere.position.y = 1.5;
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

  const changeMaterial = useCallback(() => {
    const bar =
      barGrid.current[Math.floor(Random(0, barGrid.current.length))][
        Math.floor(Random(0, barGrid.current[0].length))
      ];
    const barMaterial = new THREE.MeshPhongMaterial({
      color: `rgb(${Math.floor(Random(0, 255))},${Math.floor(
        Random(0, 255)
      )},${Math.floor(Random(0, 255))})`,
      emissive: 0x000000,
      specular: 0x111111,
      shininess: 30,
      refractionRatio: 0.5,
      reflectivity: 0.5,
    });
    bar.material = barMaterial;
  }, []);

  const changeSpeed = useCallback(() => {
    speed.current = Random(0.1, 0.5);
  }, []);

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
        const image = new Image();
        image.src = cmap;
        image.onload = () => {
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
        const image = new Image();
        image.src = hmap;
        image.onload = () => {
          ctx.drawImage(image, 0, 0, width, width);
        };
      }
    }
  }, [canvasRef1, imgContainerRef1, canvasRender1]);

  // drag
  const draggerRef = useRef<HTMLDivElement>(null);
  const draggerRef2 = useRef<HTMLDivElement>(null);

  const mouseDown = useRef<boolean>(false);
  const draggerPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const offset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

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

  const onMouseUp = useCallback(() => {
    mouseDown.current = false;
  }, []);

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
          onMouseMove={(e) => drag(e, draggerRef, imgContainerRef1)}
        >
          <div
            ref={draggerRef}
            className={css.dragger}
            onMouseDown={(e) => onMouseDown(e, draggerRef)}
            onMouseUp={onMouseUp}
          />
          <canvas ref={canvasRef1} />
        </div>
        <div
          className={css.imageContainer}
          ref={imgContainerRef2}
          onMouseMove={(e) => drag(e, draggerRef2, imgContainerRef2)}
        >
          <div
            ref={draggerRef2}
            className={css.dragger}
            onMouseDown={(e) => onMouseDown(e, draggerRef2)}
            onMouseUp={onMouseUp}
          />
          <canvas ref={canvasRef2} />
        </div>
        {/* <img src={cmap} id={css.cmap} />
        <img src={hmap} id={css.hmap} /> */}
      </div>
      <div className={css.column}>
        <div id={css.render} ref={renderRef}></div>
        {/* <button onClick={changeMaterial}>Change random</button> */}
        {/* <button onClick={changeSpeed}>Change speed</button> */}
      </div>
    </div>
  );
};

export default Grid;
