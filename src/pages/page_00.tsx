import css from "../styles/main.module.scss";
import Routes from "../routes/routes";
import logo from "../assets/images/reducto.png";
import {
  BsChevronLeft,
  BsFillBoxFill,
  BsChevronUp,
  BsChevronDown,
} from "react-icons/bs";
import { AiOutlineMenu, AiFillExperiment } from "react-icons/ai";
import { FC, useRef, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { COMPONENTS, EXPERIMENTS, WEBSITES } from "../constants";
import { HiMiniWindow } from "react-icons/hi2";
import AppContext from "../context/appContext";
import { IAppContext } from "../types";
// import { GiBigDiamondRing } from "react-icons/gi";
const router = createBrowserRouter(Routes);

const Page_00: FC = () => {
  const [collapse, setCollapse] = useState(true);
  const [opacity, setOpacity] = useState(true);
  const time = useRef(0);

  const toggleCollapse = (): void => {
    setCollapse(!collapse);
  };

  const onHover = (): void => {
    clearTimeout(time.current);
    setOpacity(false);
  };

  const onLeave = (): void => {
    time.current = setTimeout(() => {
      setOpacity(true);
    }, 1000);
  };

  const hideAndNavigate = async (path: string): Promise<void> => {
    setOpacity(true);
    setCollapse(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.navigate(path);
  };

  const [collapseComponent, setCollapseComponent] = useState(true);
  const [collapseExperiment, setCollapseExperiment] = useState(false);
  const [collapseWebsite, setCollapseWebsite] = useState(false);
  // const [collapseWedding, setCollapseWedding] = useState(false);

  const toggleCollapseComponent = (): void => {
    setCollapseComponent(!collapseComponent);
  };

  const toggleCollapseExperiment = (): void => {
    setCollapseExperiment(!collapseExperiment);
  };

  const toggleCollapseWebsite = (): void => {
    setCollapseWebsite(!collapseWebsite);
  };

  // const toggleCollapseWedding = (): void => {
  //   setCollapseWedding(!collapseWedding);
  // };

  const onNameClick = (): void => {
    hideAndNavigate("/");
  };

  const [showMenu, setShowMenu] = useState(true);

  const appContextValue: IAppContext = {
    showMenu,
    setShowMenu,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <div id={css.main}>
        {showMenu && (
          <div
            id={css.menu}
            onClick={toggleCollapse}
            className={opacity ? css.hide : ""}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
          >
            <AiOutlineMenu />
          </div>
        )}
        <div id={css.navigator} className={collapse ? css.collapse : ""}>
          <div id={css.header} onClick={onNameClick}>
            <div id={css.logo}>
              <img src={logo} />
            </div>
            <span>REDUCTO</span>
            <div id={css.collapse} onClick={toggleCollapse}>
              <BsChevronLeft />
            </div>
          </div>
          <div className={css.item} onClick={toggleCollapseComponent}>
            <div className={css.itemIcon}>
              <BsFillBoxFill />
            </div>
            <span>Components </span>
            <div className={css.chevron}>
              {collapseComponent ? <BsChevronDown /> : <BsChevronUp />}
            </div>
          </div>
          <div
            className={`${css.toggler} ${
              collapseComponent ? css.collapse : ""
            }`}
          >
            {COMPONENTS.map(({ name, path }, index) => (
              <div className={css.subitem} key={index}>
                <a href={path}>{name}</a>
              </div>
            ))}
          </div>
          <div className={css.item} onClick={toggleCollapseExperiment}>
            <div className={css.itemIcon}>
              <AiFillExperiment />
            </div>
            <span>Experiments</span>
            <div className={css.chevron}>
              {collapseExperiment ? <BsChevronDown /> : <BsChevronUp />}
            </div>
          </div>
          <div
            className={`${css.toggler} ${
              collapseExperiment ? css.collapse : ""
            }`}
          >
            {EXPERIMENTS.map(({ name, path }, index) => (
              <div className={css.subitem} key={index}>
                <span onClick={(): Promise<void> => hideAndNavigate(path)}>
                  {name}
                </span>
              </div>
            ))}
          </div>
          <div className={css.item} onClick={toggleCollapseWebsite}>
            <div className={css.itemIcon}>
              <HiMiniWindow />
            </div>
            <span>Heroe Banner</span>
            <div className={css.chevron}>
              {collapseWebsite ? <BsChevronDown /> : <BsChevronUp />}
            </div>
          </div>
          <div
            className={`${css.toggler} ${collapseWebsite ? css.collapse : ""}`}
          >
            {WEBSITES.map(({ name, path }, index) => (
              <div className={css.subitem} key={index}>
                <span onClick={(): Promise<void> => hideAndNavigate(path)}>
                  {name}
                </span>
              </div>
            ))}
          </div>
          {/* <div className={css.item} onClick={toggleCollapseWedding}>
          <div className={css.itemIcon}>
            <GiBigDiamondRing />
          </div>
          <span>Webdding</span>
          <div className={css.chevron}>
            {collapseWedding ? <BsChevronDown /> : <BsChevronUp />}
          </div>
        </div> */}
        </div>
        <div id={css.body}>
          <RouterProvider router={router} />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default Page_00;
