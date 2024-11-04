import { FC, useEffect, useState } from "react";
import AsteroidWrapper from "./AsteroidWrapper";

const Asteroids: FC = () => {
  const [length, setLength] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setLength((prevCount) => {
        if (prevCount >= 15) {
          // Detiene el incremento cuando llega a 20
          clearInterval(interval);
          return prevCount;
        }
        return prevCount + 3; // Incrementa de 5 en 5
      });
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return Array.from({ length }, (_, index) => <AsteroidWrapper key={index} />);
};

export default Asteroids;
