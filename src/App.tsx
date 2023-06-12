import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Page_00 from './pages/page_00';

const router = createBrowserRouter([
  {
    path: "/page_complete_order",
    element: <Page_00/>,
  },
]);

const App = () => {

  return <>
    <RouterProvider router={router} />
  </>
}


export default App
