import useUser from '@/hooks/useUser';
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
  const { user } = useUser();

  return (
    <Container className="container">
      <Header>
        <HeaderContainer>
          <Heading className="truncate" title={`Hello, ${user.name.get()}`}>
            Hello, {user.name.get()}
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
