import { FC, useEffect, useState } from "react";
import css from "../styles/main.module.scss";
import { IGlitchText } from "../types";
import GlitchCharacter from "./glitchCharacter";

const GlitchText: FC<IGlitchText> = ({
  text,
  searchTime = 70,
  stop = 500,
  letter = 20,
  initialDelay = 100,
}: IGlitchText) => {
  const [characters, setCharacters] = useState<string[]>(text.split(""));
  const [changeCounter, setChangeCounter] = useState<number>(0);

  useEffect(() => {
    setCharacters(text.split(""));
    setChangeCounter((prev) => prev + 1);
  }, [text]);

  return (
    <span className={css.glitchText}>
      {characters.map((character: string, index: number) => (
        <GlitchCharacter
          stop={stop}
          searchTime={searchTime}
          key={`${changeCounter}${character}${index}`}
          delay={initialDelay + letter * (index + 1)}
          text={character}
        />
      ))}
    </span>
  );
};

export default GlitchText;
