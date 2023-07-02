import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Routes from './routes/routes';

const router = createBrowserRouter(Routes);

const App = () => {

  return <>
    <RouterProvider router={router} />
  </>
}


export default App
