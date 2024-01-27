import useMediaQuery from '@/hooks/useMediaQuery';
import SideBarAbout from '../SideBarAbout';
import SideBarUser from '../SideBarUser';
import { getScreen } from '@/styles';
import { Container } from './styles';

export default function SideBar(props) {
  const { className, states } = props;
  const [viewSideBar, setViewSideBar] = states;
  const isDesktop = useMediaQuery(`(min-width: ${getScreen('desktop')})`);

  return (
    <Container className={className} $desktop={isDesktop} $view={viewSideBar}>
      <span className="handle" onClick={() => setViewSideBar((prev) => !prev)}>
        ☞
      </span>
      <div className="bar-wrapper">
        <p className="update">Code updated at: 27/01/2024 12:38</p>
        <SideBarUser />
        <SideBarAbout />
      </div>
    </Container>
  );
}
