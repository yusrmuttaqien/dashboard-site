import useUser from '@/hooks/useUser';
import { STORAGE_USERNAME } from '@/constants/storages';
import {
  Container,
  Heading,
  Header,
  HeaderContainer,
  Search,
  Mozaic,
  Visa,
  ToDo,
  Activity,
  Meter,
  Chats,
} from './styles';

export default function Overview() {
  const userData = useUser();

  return (
    <Container className="container">
      <Header>
        <HeaderContainer>
          <Heading className="truncate" title={`Hello, ${userData.name}`}>
            Hello, {userData.name}
          </Heading>
          <p className="truncate" title="Welcome to dashboard! Have a look around!">
            Welcome to dashboard! Have a look around!
          </p>
        </HeaderContainer>
        <Search />
      </Header>
      <Mozaic>
        <Visa />
        <ToDo />
        <Meter />
        <Activity />
        <Chats />
      </Mozaic>
    </Container>
  );
}
