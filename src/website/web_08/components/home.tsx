import css from "../styles/home.module.scss";
import Map from "./map";
import Button from "./button";
import { FC } from "react";

const Home: FC = () => {
  // const title = "REDUCTO";
  const title = "SITIO WEB";
  const subtitle = "DESARROLLO WEB";
  const texts = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    "Suspendisse et urna venenatis, fringilla massa at",
    "Pharetra lorem. Nunc placerat consequat magna",
    "Non cursus libero molestie in",
  ];

  return (
    <div id={css.home}>
      <div id={css.background}>
        <div id={css.purpleShadow} />
        <div className={css.layer} id={css.grid} />
        <div className={css.layer} id={css.laptop} />
        <div className={css.layer} id={css.views} />
      </div>
      <div id={css.mainTexts}>
        <span id={css.title}>{title}</span>
        <span id={css.subtitle}>{subtitle}</span>
        <Map id={css.description} elements={texts} />
        <Button class_={css.button}>CONTACTO</Button>
      </div>
    </div>
  );
};

export default Home;
