import Page_00 from "../pages/page_00";
import Page_01 from "../pages/page_01";
import Page_02 from "../pages/page_02";
import Page_03 from "../pages/page_03";
import Page_04 from "../pages/page_04";
import Page_05 from "../pages/page_05";
import Page_06 from "../pages/page_06";
import Page_07 from "../pages/page_07";
import Page_08 from "../pages/page_08";

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
    path: "/search_bar",
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
];

export default Routes;