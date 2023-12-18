import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Error from './Error';
import { getLocalStorage, removeLocalStorage, updateLocalStorage } from '@/utils/localStorage';
import { ROUTER_LOGOUT } from '@/constants/router';
import 

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
    loader: () => {
      if (!getLocalStorage('username')) {
        throw redirect('/login');
      }

      return null;
    },
    action: async (e) => {
      const username = await e.request.text();

      updateLocalStorage('username', username);
      return redirect('/');
    },
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    loader: (e) => {
      if (getLocalStorage('username')) {
        throw redirect('/');
      }

      return null;
    },
    action: async (e) => {
      const code = await e.request.text();

      if (code === ROUTER_LOGOUT) {
        removeLocalStorage('username');
      }

      return null;
    },
  },
]);

export default function PageRouter() {
  return <RouterProvider router={router} />;
}
