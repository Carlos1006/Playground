import AudioFrequecies from "../../../components/audioFreqs";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AudioSphere from "../../../components/audioSphere/components/OrbCore";
import CompleteOrder from "../../../components/completeOrder";
import CompleteOrderWithError from "../../../components/completeOrder_01";
import DayNightToggle from "../../../components/daynightToggle_01";
import DeleteFile from "../../../components/deleteFile";
import GlowButton from "../../../components/glowButton";
import LoginRobot from "../../../components/loginRobotShowCase";
import Rocket from "../../../components/rocket";
import SusbcribeButton from "../../../components/subscribeButton";
import Page_08 from "../../../pages/page_08";
import Page_15 from "../../../pages/page_15";
import Page_16 from "../../../pages/page_16";
import {
  IShowCaseComponent,
  IShowCaseComponents,
  ShowCaseComponent,
} from "../types";
import { Fragment } from "react";
import css from "../styles/showCase.module.scss";
import Globe from "../../../components/globe";
import Grid from "../../../components/3dGrid";
import GridBigger from "../../../components/3dGridBigger";

export namespace SHOWCASE_COMPONENT {
  export const DAY_NIGHT_TOGGLE: ShowCaseComponent = "DayNightToggle";
  export const GLOW_BUTTON: ShowCaseComponent = "GlowButton";
  export const DELETE_FILE: ShowCaseComponent = "DeleteFile";
  export const COMPLETE_ORDER: ShowCaseComponent = "CompleteOrder";
  export const COMPLETE_ORDER_WITH_ERROR: ShowCaseComponent =
    "CompleteOrderWithError";
  export const SUBSCRIBE_BUTTON: ShowCaseComponent = "SubscribeButton";
  export const AUDIO_SPHERE: ShowCaseComponent = "AudioSphere";
  export const AUDIO_FREQUENCIES: ShowCaseComponent = "AudioFrequecies";
  export const LOGIN_ROBOT: ShowCaseComponent = "LoginRobot";
  export const ROCKET: ShowCaseComponent = "Rocket";
  export const PAGE_16: ShowCaseComponent = "Page_16";
  export const PAGE_15: ShowCaseComponent = "Page_15";
  export const PAGE_08: ShowCaseComponent = "Page_08";
  export const GRID: ShowCaseComponent = "Grid";
  export const TERRAIN: ShowCaseComponent = "Terrain";
  export const GLOBE: ShowCaseComponent = "Globe";
}

export const SHOWCASE_COMPONENTS_ARRAY: ShowCaseComponent[] = [
  SHOWCASE_COMPONENT.DAY_NIGHT_TOGGLE,
  SHOWCASE_COMPONENT.GLOW_BUTTON,
  SHOWCASE_COMPONENT.DELETE_FILE,
  SHOWCASE_COMPONENT.COMPLETE_ORDER,
  SHOWCASE_COMPONENT.COMPLETE_ORDER_WITH_ERROR,
  SHOWCASE_COMPONENT.SUBSCRIBE_BUTTON,
  SHOWCASE_COMPONENT.AUDIO_SPHERE,
  SHOWCASE_COMPONENT.AUDIO_FREQUENCIES,
  SHOWCASE_COMPONENT.LOGIN_ROBOT,
  SHOWCASE_COMPONENT.ROCKET,
  SHOWCASE_COMPONENT.PAGE_16,
  SHOWCASE_COMPONENT.PAGE_15,
  SHOWCASE_COMPONENT.PAGE_08,
  SHOWCASE_COMPONENT.GRID,
  SHOWCASE_COMPONENT.TERRAIN,
  SHOWCASE_COMPONENT.GLOBE,
];

export const EMPTY_COMPONENT: IShowCaseComponent = {
  component: Fragment,
  props: {},
  title: "",
};

export const SHOWCASE_COMPONENTS: IShowCaseComponents = {
  [SHOWCASE_COMPONENT.DAY_NIGHT_TOGGLE]: {
    component: DayNightToggle,
    props: {},
    title: "Day/Night Toggle",
  },
  [SHOWCASE_COMPONENT.GLOW_BUTTON]: {
    component: GlowButton,
    props: {},
    title: "Glow Button",
  },
  [SHOWCASE_COMPONENT.DELETE_FILE]: {
    component: DeleteFile,
    props: {},
    title: "Delete File",
  },
  [SHOWCASE_COMPONENT.COMPLETE_ORDER]: {
    component: CompleteOrder,
    props: {},
    title: "Complete Order",
  },
  [SHOWCASE_COMPONENT.COMPLETE_ORDER_WITH_ERROR]: {
    component: CompleteOrderWithError,
    props: {},
    title: "Complete Order With Error",
  },
  [SHOWCASE_COMPONENT.SUBSCRIBE_BUTTON]: {
    component: SusbcribeButton,
    props: {},
    title: "Subscribe Button",
  },
  [SHOWCASE_COMPONENT.AUDIO_SPHERE]: {
    component: AudioSphere,
    props: {
      showBackground: false,
      size: [1.9, 1.8],
      scale: 1.5,
      particalSize: 10,
      intensity: 0.12,
    },
    title: "Audio Sphere",
  },
  [SHOWCASE_COMPONENT.AUDIO_FREQUENCIES]: {
    component: AudioFrequecies,
    props: {
      scale: 0.5,
    },
    title: "Audio Frequencies",
  },
  [SHOWCASE_COMPONENT.LOGIN_ROBOT]: {
    component: LoginRobot,
    props: {
      extraCss: {
        scale: "85%",
        translate: "0 3cqb",
      },
    },
    title: "Login Robot",
  },
  [SHOWCASE_COMPONENT.ROCKET]: {
    component: Rocket,
    props: {
      asteroidScale: 1.5,
      range: [-200, 200],
      count: 15000,
    },
    title: "Rocket",
  },
  [SHOWCASE_COMPONENT.PAGE_16]: {
    component: Page_16,
    props: {
      showCase: true,
    },
    title: "3D Bar Graph",
  },
  [SHOWCASE_COMPONENT.PAGE_15]: {
    component: Page_15,
    props: {
      showCase: true,
    },
    title: "Glow Bubbles",
  },
  [SHOWCASE_COMPONENT.PAGE_08]: {
    component: Page_08,
    props: {
      showCase: true,
      className: css.tree,
    },
    title: "Node Tree",
  },
  [SHOWCASE_COMPONENT.GRID]: {
    component: Grid,
    props: {
      showCase: true,
    },
    title: "Grid",
  },
  [SHOWCASE_COMPONENT.TERRAIN]: {
    component: GridBigger,
    props: {
      showCase: true,
    },
    title: "Terrain",
  },
  [SHOWCASE_COMPONENT.GLOBE]: {
    component: Globe,
    props: {},
    title: "Globe",
  },
};
