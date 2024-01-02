import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import Main from '@/pagebases/Main';
import Overview from './Overview';
import Settings from './Settings';
import Login from './Login';
import Error from './Error';
import { CARD_STATE_PROVIDER, hydrateStates, resetStates } from '@/utils/states';
import { STORAGE_USERNAME } from '@/constants/storages';
import {
  getLocalStorage,
  getSessionStorage,
  removeLocalStorage,
  removeSessionStorage,
  updateSessionStorage,
} from '@/utils/storages';
import { ROUTER_LOGOUT } from '@/constants/router';

const _handleGateIn = (e) => {
  if (getSessionStorage(STORAGE_USERNAME)) return null;
  return redirect('/login');
};
const _handleGateOut = (e) => {
  if (!getSessionStorage(STORAGE_USERNAME)) return null;
  return redirect('/');
};
const _handleStates = async (e) => {
  const username = await e.request.text();

  updateSessionStorage(STORAGE_USERNAME, username);
  hydrateStates(true);
  return redirect('/');
};
const _handleLogout = async (e) => {
  const code = await e.request.text();

  if (code === ROUTER_LOGOUT) {
    removeSessionStorage(STORAGE_USERNAME);
    resetStates();
  }

  return null;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Overview />,
        loader: _handleGateIn,
        action: _handleStates,
      },
      {
        path: '/settings',
        element: <Settings />,
        loader: _handleGateIn,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    loader: _handleGateOut,
    action: _handleLogout,
  },
]);

export default function PageRouter() {
  return <RouterProvider router={router} />;
}
