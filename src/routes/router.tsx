import { createBrowserRouter } from 'react-router-dom';
import HomePage from 'pages/home/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/404',
    element: 'Page not found',
  },
]);

export default router;
