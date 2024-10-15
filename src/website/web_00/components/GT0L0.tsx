import { FC, useState } from "react";
import globalCss from "../styles/main.module.scss";
import AboutMe from "./AboutMe";
import ShortAboutMe from "./ShortAboutMe";
import Tldr from "./Tldr";
import If from "./If";

const Gt0l0: FC = () => {
  const [active, setActive] = useState<boolean>(false);

  const onClick = (): void => {
    setActive((prev) => !prev);
  };

  return (
    <div
      data-slot="gt0l0-00"
      className={`${globalCss.slot} ${globalCss.lock} ${globalCss.relative}`}
    >
      <Tldr active={active} onClick={onClick} />
      <If condition={active}>
        <ShortAboutMe />
      </If>
      <If condition={!active}>
        <AboutMe />
      </If>
    </div>
  );
};

export default Gt0l0;
