import { FC, useState } from "react";
import AsteroidWrapper from "./AsteroidWrapper";

const Asteroids: FC = () => {
  const [asteroids] = useState<number>(20);

  return (
    <>
      {Array.from({ length: asteroids }, (_, index) => (
        <AsteroidWrapper key={index} />
      ))}
    </>
  );
};

export default Asteroids;
