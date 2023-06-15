import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Page_02 from './pages/page_02';
import Page_01 from './pages/page_01';
import Page_00 from './pages/page_00';

const router = createBrowserRouter([
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
]);

const App = () => {

  return <>
    <RouterProvider router={router} />
  </>
}


export default App
