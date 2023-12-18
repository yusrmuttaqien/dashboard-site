import { useState, useEffect } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import SideNav from './fragments/SideNav';
import Overview from './fragments/Overview';
import { getScreen } from '@/styles';
import { Main, SideBar } from './styles';

export default function Home() {
  const [viewSideBar, setViewSideBar] = useState(false);
  const isDesktop = useMediaQuery(`(min-width: ${getScreen('desktop')})`);

  useEffect(() => {
    if (isDesktop) setViewSideBar(false);
  }, [isDesktop]);

  return (
    <Main>
      <SideNav />
      <Overview />
      <SideBar $view={viewSideBar} />
    </Main>
  );
}
