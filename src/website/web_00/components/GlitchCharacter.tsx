import { FC, useEffect, useState } from "react";
import { IGlitchCharacter } from "../types";

const GlitchCharacter: FC<IGlitchCharacter> = ({
  text,
  delay,
  searchTime,
  stop,
}: IGlitchCharacter) => {
  const possiblesCharacter = "•ØÆæÄ`WÄ0D";
  const [temporalValue, setTemporalValue] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const loop = setInterval(() => {
        setTemporalValue(
          possiblesCharacter[
            Math.floor(Math.random() * possiblesCharacter.length)
          ]
        );
      }, searchTime);
      setTimeout(() => {
        clearInterval(loop);
        setShow(true);
      }, stop);
    }, delay);
  }, [delay, searchTime, stop]);

  return show ? text : temporalValue;
};

export default GlitchCharacter;
