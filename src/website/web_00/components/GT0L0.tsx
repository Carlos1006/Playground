import { FC, useState } from "react";
import globalCss from "../styles/main.module.scss";
import AboutMe from "./AboutMe";
import ShortAboutMe from "./ShortAboutMe";
import Tldr from "./Tldr";
import If from "./If";
import useHomeContext from "../hooks/useHomeContext";
import css from "../styles/gt0l0.module.scss";
import OldMenuSlot from "./OldMenuSlot";

const Gt0l0: FC = () => {
  const { themeMode } = useHomeContext();

  const [active, setActive] = useState<boolean>(false);

  const onClick = (): void => {
    setActive((prev) => !prev);
  };

  return (
    <div
      id={css.gt0l0}
      data-slot="gt0l0-00"
      data-mode={themeMode}
      className={`${globalCss.slot} ${globalCss.lock} ${globalCss.relative}`}
    >
      <Tldr active={active} onClick={onClick} />
      <If condition={active}>
        <ShortAboutMe />
      </If>
      <If condition={!active}>
        <AboutMe />
      </If>
      <OldMenuSlot />
    </div>
  );
};

export default Gt0l0;
