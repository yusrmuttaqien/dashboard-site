import { useNavigate, useSubmit, useLocation } from 'react-router-dom';
import { Nav, Logo, Exit, NavLists, NavList } from './styles';
import { ROUTER_LOGOUT, ROUTER_PATHS } from '@/constants/router';

export default function SideNav() {
  const navigate = useNavigate();
  const submit = useSubmit();
  const location = useLocation();

  const _handleLogout = () =>
    submit(ROUTER_LOGOUT, { method: 'POST', action: '/login', encType: 'text/plain' });
  const _handleNavigate = (path) => () => navigate(path);
  const _defineActive = (path) => (path === location.pathname ? true : false);

  return (
    <Nav>
      <Logo onClick={_handleNavigate('/')} />
      <NavLists>
        {ROUTER_PATHS.map(({ path, icon: Icon }) => (
          <NavList
            key={path}
            as={Icon}
            onClick={_handleNavigate(path)}
            $active={_defineActive(path)}
          />
        ))}
      </NavLists>
      <Exit onClick={_handleLogout} />
    </Nav>
  );
}
