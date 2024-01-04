import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import Main from '@/pagebases/Main';
import Overview from './Overview';
import Settings from './Settings';
import Login from './Login';
import Error from './Error';
import { ROUTER_LOGOUT } from '@/constants/router';
import { _initiateLogin, _initiateLogout, _defineLoginStatus } from '@/hooks/useUser';

const _handleGateIn = (e) => {
  if (_defineLoginStatus()) return null;
  return redirect('/login');
};
const _handleGateOut = (e) => {
  if (!_defineLoginStatus()) return null;
  return redirect('/');
};
const _handleStates = async (e) => {
  const username = await e.request.text();

  return _initiateLogin(username);
};
const _handleLogout = async (e) => {
  const code = await e.request.text();

  if (code === ROUTER_LOGOUT) {
    _initiateLogout();
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
