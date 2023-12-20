import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import Main from '@/pagebases/Main';
import Overview from './Overview';
import Settings from './Settings';
import Login from './Login';
import Error from './Error';
import { getLocalStorage, removeLocalStorage, updateLocalStorage } from '@/utils/localStorage';
import { ROUTER_LOGOUT } from '@/constants/router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
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
    children: [
      {
        path: '/',
        element: <Overview />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
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
