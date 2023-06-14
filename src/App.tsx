import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Page_00 from './pages/page_00';
import Page_01 from './pages/page_01';

const router = createBrowserRouter([
  {
    path: "/page_complete_order",
    element: <Page_00/>,
  },
  {
    path: "/day_night_toggle",
    element: <Page_01/>,
  },
]);

const App = () => {

  return <>
    <RouterProvider router={router} />
  </>
}


export default App
