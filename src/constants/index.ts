import { IAppContext } from "../types";

export const R = 0;
export const G = 1;
export const B = 2;

export const COMPONENTS = [
  {
    name: "Day|Night Toggle",
    path: "/day_night_toggle",
  },
  {
    name: "Complete Order Button",
    path: "/page_complete_order",
  },
  {
    name: "Delete File",
    path: "/delete_file",
  },
  {
    path: "/glow_button",
    name: "Glow Button",
  },
  {
    path: "/subscribe",
    name: "Subscribe Button",
  },
  {
    path: "/robot",
    name: "Robot",
  },
  {
    path: "/node_tree",
    name: "Node Tree",
  },
  {
    path: "/node_tree_variant",
    name: "Node Tree Variant",
  },
  {
    path: "/graph",
    name: "Graph",
  },
  {
    path: "/loginRobot",
    name: "Login Robot",
  },
  {
    path: "/bubble",
    name: "Bubbles",
  },
  {
    path: "/bargraph3d",
    name: "Bar Graph 3D",
  },
  {
    path: "/audiosphere",
    name: "Audio Sphere",
  },
  {
    path: "/audioFreqs",
    name: "Audio Frequencies",
  },
  {
    path: "/rocket",
    name: "Rocket",
  },
];

export const EXPERIMENTS = [
  {
    path: "/terrain",
    name: "Terrain",
  },
  {
    path: "/grid",
    name: "Grid",
  },
  {
    path: "/dateToImg",
    name: "Date to Image",
  },
  {
    path: "/gifToVideo",
    name: "Gif to Video",
  },
  {
    path: "/jquery",
    name: "jQuery 4 Testing",
  },
];

export const WEBSITES = [
  {
    path: "/web_01",
    name: "Scenic Iceland",
  },
  {
    path: "/web_02",
    name: "Cyberpunk Slideshow",
  },
  {
    path: "/web_03",
    name: "Cube",
  },
  {
    path: "/web_04",
    name: "Terrain",
  },
  {
    path: "/web_05",
    name: "Forest",
  },
  {
    path: "/web_06",
    name: "Squares",
  },
  {
    path: "/web_07",
    name: "CD",
  },
  {
    path: "/web_08",
    name: "SVG",
  },
  {
    path: "/web_09",
    name: "City Rotate",
  },
  {
    path: "/web_10",
    name: "OctoKush",
  },
  {
    path: "/web_11",
    name: "Sushi",
  },
  {
    path: "/web_12",
    name: "Coffehub",
  },
  {
    path: "/web_13",
    name: "Anime Landing",
  },
  {
    path: "/web_13_1",
    name: "Anime Landing (New Model)",
  },
  {
    path: "/web_14",
    name: "Anime Landing Video",
  },
  {
    path: "/web_15",
    name: "Bento Grid",
  },
];

export const APP_CONTEXT_DEFAULT: IAppContext = {
  showMenu: false,
  setShowMenu: () => {
    return;
  },
};
