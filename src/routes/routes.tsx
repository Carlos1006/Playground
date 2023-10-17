import Page_00 from "../pages/page_00";
import Page_01 from "../pages/page_01";
import Page_02 from "../pages/page_02";
import Page_03 from "../pages/page_03";
import Page_04 from "../pages/page_04";
import Page_05 from "../pages/page_05";
import Page_06 from "../pages/page_06";
import Page_07 from "../pages/page_07";
import Page_08 from "../pages/page_08";
import Page_09 from "../pages/page_09";
import Page_10 from "../pages/page_10";
import Page_11 from "../pages/page_11";
import Page_12 from "../pages/page_12";
import Page_13 from "../pages/page_13";

import Web_01 from "../website/web_01";
import Web_02 from "../website/web_02";
import Web_03 from "../website/web_03";
import Web_04 from "../website/web_04";

const Routes = [
  {
    path: "/",
    element: <Page_00 />,
  },
  {
    path: "/day_night_toggle",
    element: <Page_01 />,
  },
  {
    path: "/page_complete_order",
    element: <Page_02 />,
  },
  {
    path: "/delete_file",
    element: <Page_03 />,
  },
  {
    path: "/glow_button",
    element: <Page_04 />,
  },
  {
    path: "/subscribe",
    element: <Page_05 />,
  },
  {
    path: "/none",
    element: <Page_06 />,
  },
  {
    path: "/node_tree",
    element: <Page_07 />,
  },
  {
    path: "/node_tree_variant",
    element: <Page_08 />,
  },
  {
    path: "/graph",
    element: <Page_09 />,
  },
  {
    path: "/loginRobot",
    element: <Page_10 />,
  },
  {
    path: "/terrain",
    element: <Page_11 />,
  },
  {
    path: "/grid",
    element: <Page_12 />,
  },
  {
    path: "/forest",
    element: <Page_13 />,
  },
  {
    path: "/web_01",
    element: <Web_01 />,
  },
  {
    path: "/web_02",
    element: <Web_02 />,
  },
  {
    path: "/web_03",
    element: <Web_03 />,
  },
  {
    path: "/web_04",
    element: <Web_04 />,
  },
];

export default Routes;
