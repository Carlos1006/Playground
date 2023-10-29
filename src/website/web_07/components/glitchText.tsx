import { FC } from "react";
import css from "../styles/main.module.scss";
import { IGlitchText } from "../types";
import GlitchCharacter from "./glitchCharacter";

const GlitchText: FC<IGlitchText> = ({
  text,
  searchTime = 70,
  stop = 500,
  letter = 20,
  initialDelay = 1000,
}: IGlitchText) => {
  const characters = text.split("");
  //const len = characters.length;
  //const [finalValue, setFinalValue] = useState([]);
  //const array = new Array(characters.length).fill(false);
  return (
    <span className={css.glitchText}>
      {characters.map((character: string, index: number) => (
        <GlitchCharacter
          stop={stop}
          searchTime={searchTime}
          key={index}
          delay={initialDelay + letter * (index + 1)}
          text={character}
        />
      ))}
    </span>
  );
};

export default GlitchText;
