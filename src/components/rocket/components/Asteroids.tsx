import { FC, useRef } from "react";
import Asteroid from "./Asteroid";
import * as THREE from "three";
import { RapierRigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

const Asteroids: FC = () => {
  //const [positions, setPositions] = useState<THREE.Vector3[]>([]); //positions

  // useEffect(() => {
  //   const positions: THREE.Vector3[] = [];
  //   for (let i = 0; i < 1; i++) {
  //     const x = Math.random() * 10 - 5;
  //     const y = Math.random() * 10 - 5;
  //     positions.push(new THREE.Vector3(x, y, 0));
  //   }
  //   setPositions(positions);
  // }, []);

  // return positions.map((position, index) => (
  //   <Asteroid key={index} position={position} />
  // ));

  const asteroidRef = useRef<RapierRigidBody | null>(null);
  const moving = useRef<boolean>(false);

  useFrame(() => {
    if (asteroidRef.current) {
      console.log("Applying impulse");
      console.log(asteroidRef.current);

      if (!moving.current) {
        asteroidRef.current.applyImpulse(
          new THREE.Vector3(0, -0.0002, 0),
          true
        );
      }

      const position = asteroidRef.current.translation();
      if (position.y < -4) {
        asteroidRef.current.setTranslation(new THREE.Vector3(3, 5, 0), true);
        asteroidRef.current.setLinvel(new THREE.Vector3(0, 0, 0), true);
        asteroidRef.current.setAngvel(new THREE.Vector3(0, 0, 0), true);
      }
    }
  });

  return (
    <Asteroid
      position={new THREE.Vector3(3, 5, 0)}
      setRef={(ref: RapierRigidBody | null): void => {
        asteroidRef.current = ref;
      }}
    />
  );
};

export default Asteroids;
