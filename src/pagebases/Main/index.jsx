import { useState, useEffect } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import { Outlet } from 'react-router-dom';
import SideNav from './fragments/SideNav';
import { getScreen } from '@/styles';
import { hydrateStates } from '@/utils/states';
import { Container, SideBar } from './styles';

export default function Main() {
  const [viewSideBar, setViewSideBar] = useState(false);
  const isDesktop = useMediaQuery(`(min-width: ${getScreen('desktop')})`);

  useEffect(() => {
    if (isDesktop) setViewSideBar(false);
  }, [isDesktop]);

  useEffect(() => {
    const destroyListeners = hydrateStates(false, true);

    return () => destroyListeners();
  }, []);

  return (
    <Container>
      <SideNav />
      <Outlet />
      <SideBar states={[viewSideBar, setViewSideBar]} $view={viewSideBar} />
    </Container>
  );
}
