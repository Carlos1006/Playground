export {};
// import { DegToRad } from "../../website/web_03/utils";
// import {
//   createScene,
//   createCamera,
//   createRenderer,
//   createReferenceCube,
//   createAmbientLight,
//   createSpotLight,
// } from "./utils";
// import {
//   OrbitControls,
//   OrthographicCamera,
//   PerspectiveCamera,
// } from "@react-three/drei";

// const renderRef = useRef<HTMLDivElement>(null);
// const canvasRender1 = useRef<number>(0);
// const scene = useRef<THREE.Scene>(new THREE.Scene());
// const mainContainer = useRef<THREE.Group>(new THREE.Group());
// const camera = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera());
// const renderer = useRef<THREE.WebGLRenderer>(new THREE.WebGLRenderer());
// const clock = useRef<THREE.Clock>(new THREE.Clock());
// const referenceCube = useRef<THREE.Mesh>(new THREE.Mesh());
// const ambientLight = useRef<THREE.HemisphereLight>(
//   new THREE.HemisphereLight()
// );
// const spotLight = useRef<THREE.Mesh>(new THREE.Mesh());
// const currentFov = useRef<number>(fov);

// useEffect(() => {
//   canvasRender1.current = canvasRender1.current + 1;

//   if (renderRef.current && canvasRender1.current === 1) {
//     const add = (object: THREE.Object3D): void => {
//       console.log("add");
//       if (scene.current) {
//         scene.current.add(object);
//       }
//     };

//     const animate = (): void => {
//       console.log("animate");
//       const delta = clock.current.getDelta();
//       requestAnimationFrame(animate);
//       // barsContainer.current.rotation.y += speed.current * delta;
//       camera.current.fov = currentFov.current;
//       referenceCube.current.rotation.y += 0.8 * delta;

//       renderer.current.render(scene.current, camera.current);
//     };

//     const construct = (width: number, height: number): void => {
//       console.log("construct");
//       scene.current = createScene();
//       camera.current = createCamera(width, height, currentFov.current);
//       renderer.current = createRenderer(width, height);
//       referenceCube.current = createReferenceCube();
//       ambientLight.current = createAmbientLight();
//       spotLight.current = createSpotLight();

//       mainContainer.current.add(spotLight.current);
//       mainContainer.current.add(ambientLight.current);
//       // mainContainer.current.add(barsContainer.current);
//       mainContainer.current.add(referenceCube.current);

//       mainContainer.current.rotation.x = DegToRad(30); // 25 20
//       mainContainer.current.rotation.y = DegToRad(45); // 45 30

//       add(mainContainer.current);
//       renderRef.current?.appendChild(renderer.current.domElement);
//       animate();
//     };

//     const { width, height } = renderRef.current.getBoundingClientRect();
//     construct(width, height);
//   }
// }, []);

{
  /* <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={50} /> */
}
