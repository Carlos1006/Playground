import Page_00 from "../pages/page_00";
import Page_01 from "../pages/page_01";
import Page_02 from "../pages/page_02";
import Page_03 from "../pages/page_03";
import Page_04 from "../pages/page_04";
import Page_05 from "../pages/page_05";

const Routes = [
    {
      path: "/",
      element: <Page_00/>,
    },
    {
      path: "/day_night_toggle",
      element: <Page_01/>,
    },
    {
      path: "/page_complete_order",
      element: <Page_02/>,
    },
    {
      path: "/delete_file",
      element: <Page_03/>,
    },
    {
      path: "/glow_button",
      element: <Page_04/>,
    },
    {
      path: "/subscribe",
      element: <Page_05/>,
    }
  ];

export default Routes;