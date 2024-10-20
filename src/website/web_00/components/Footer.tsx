import { FC } from "react";
import globalCss from "../styles/main.module.scss";
import useHomeContext from "../hooks/useHomeContext";
import css from "../styles/footer.module.scss";

const Footer: FC = () => {
  const { themeMode } = useHomeContext();
  return (
    <div
      id={css.footer}
      data-slot="f0000-00"
      data-mode={themeMode}
      className={globalCss.slot}
    />
  );
};

export default Footer;
