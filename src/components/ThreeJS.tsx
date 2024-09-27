import React, { useRef, useEffect } from "react";
import css from "../styles/grid.module.scss";
import cmap from "../assets/maps/map1/cmap.png";
import hmap from "../assets/maps/map1/hmap.png";
import * as THREE from "three";
import { DegToRad } from "../website/web_03/utils";

const Grid: React.FC = () => {
  const renderRef = useRef<HTMLDivElement>(null);
  const render = useRef<number>(0);

  useEffect(() => {
    render.current = render.current + 1;
    if (renderRef.current && render.current === 1) {
      const height = renderRef.current.clientHeight;
      const width = renderRef.current.clientWidth;

      const scene = new THREE.Scene();
      const clock = new THREE.Clock();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(width, height);

      const mainLight = new THREE.HemisphereLight(
        "rgb(128,128,128)",
        "rgb(84,85,255)",
        7
      );
      mainLight.position.set(0, 5, 0);

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
      camera.position.z = 5;

      const light = new THREE.SpotLight("rgb(133,248,248)", 20);
      light.angle = 1.05;
      light.decay = 2;
      light.penumbra = 1;
      light.shadow.camera.near = 10;
      light.shadow.camera.far = 1000;
      light.shadow.camera.fov = 30;

      const sphereGeometry = new THREE.SphereGeometry(0.05, 16, 8);
      const sphere = new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      sphere.position.y = 1;
      sphere.position.x = 1;
      sphere.position.z = 1;
      sphere.add(light);

      const mainObject = new THREE.Group();
      mainObject.add(cube);
      mainObject.add(sphere);
      mainObject.add(mainLight);
      mainObject.rotation.x = DegToRad(20);

      scene.add(mainObject);

      renderRef.current.appendChild(renderer.domElement);

      const animate = (): void => {
        const delta = clock.getDelta();
        requestAnimationFrame(animate);
        cube.rotation.y += 0.8 * delta;
        renderer.render(scene, camera);
      };
      animate();
    }
  }, [renderRef, render]);

  return (
    <div id={css.grid}>
      <div className={css.column}>
        <img src={cmap} id={css.cmap} />
        <img src={hmap} id={css.hmap} />
      </div>
      <div className={css.column}>
        <div id={css.render} ref={renderRef}></div>
      </div>
    </div>
  );
};

export default Grid;
