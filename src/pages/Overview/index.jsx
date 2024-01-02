import { getSessionStorage } from '@/utils/storages';
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
} from './styles';

export default function Overview() {
  const username = getSessionStorage(STORAGE_USERNAME);

  return (
    <Container className="container">
      <Header>
        <HeaderContainer>
          <Heading className="truncate" title={`Hello, ${username}`}>
            Hello, {username}
          </Heading>
          <p className="truncate" title="Have a look around! Hope you like it!">
            Have a look around! Hope you like it!
          </p>
        </HeaderContainer>
        <Search />
      </Header>
      <Mozaic>
        <Visa />
        <ToDo />
        <Meter />
        <Activity />
      </Mozaic>
    </Container>
  );
}
