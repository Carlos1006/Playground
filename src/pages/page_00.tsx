import css from "../styles/main.module.scss";
import Routes from "../routes/routes";
import logo from "../assets/images/reducto.png";
import { BsChevronLeft, BsFillBoxFill } from "react-icons/bs";
import { AiOutlineMenu, AiFillExperiment } from "react-icons/ai";
import { useRef, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { COMPONENTS, EXPERIMENTS, WEBSITES } from "../constants";
import { HiMiniWindow } from "react-icons/hi2";
import { GiBigDiamondRing } from "react-icons/gi";
const router = createBrowserRouter(Routes);

const Page_00 = () => {
  const [collapse, setCollapse] = useState(false);
  const [opacity, setOpacity] = useState(true);
  const time = useRef(0);

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  const onHover = () => {
    clearTimeout(time.current);
    setOpacity(false);
  };

  const onLeave = () => {
    time.current = setTimeout(() => {
      setOpacity(true);
    }, 1000);
  };

  const hideAndNavigate = async (path: string) => {
    setOpacity(true);
    setCollapse(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.navigate(path);
  };

  return (
    <div id={css.main}>
      <div
        id={css.menu}
        onClick={toggleCollapse}
        className={opacity ? css.hide : ""}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <AiOutlineMenu />
      </div>
      <div id={css.navigator} className={collapse ? css.collapse : ""}>
        <div id={css.header}>
          <div id={css.logo}>
            <img src={logo} />
          </div>
          <span>REDUCTO</span>
          <div id={css.collapse} onClick={toggleCollapse}>
            <BsChevronLeft />
          </div>
        </div>
        <div className={css.item}>
          <div className={css.itemIcon}>
            <BsFillBoxFill />
          </div>
          <span>Components</span>
        </div>
        <div className={css.toggler}>
          {COMPONENTS.map(({ name, path }, index) => (
            <div className={css.subitem} key={index}>
              <a href={path}>{name}</a>
            </div>
          ))}
        </div>
        <div className={css.item}>
          <div className={css.itemIcon}>
            <AiFillExperiment />
          </div>
          <span>Experiments</span>
        </div>
        <div className={css.toggler}>
          {EXPERIMENTS.map(({ name, path }, index) => (
            <div className={css.subitem} key={index}>
              <span onClick={() => hideAndNavigate(path)}>{name}</span>
            </div>
          ))}
        </div>
        <div className={css.item}>
          <div className={css.itemIcon}>
            <HiMiniWindow />
          </div>
          <span>Heroe Banner</span>
        </div>
        <div className={css.toggler}>
          {WEBSITES.map(({ name, path }, index) => (
            <div className={css.subitem} key={index}>
              <span onClick={() => hideAndNavigate(path)}>{name}</span>
            </div>
          ))}
        </div>
        <div className={css.item}>
          <div className={css.itemIcon}>
            <GiBigDiamondRing />
          </div>
          <span>Webdding</span>
        </div>
      </div>
      <div id={css.body}>
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default Page_00;
