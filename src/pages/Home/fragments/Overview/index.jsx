import { getLocalStorage } from '@/utils/localStorage';
import { STORAGE_USERNAME } from '@/constants/localStorage';
import { Container, Heading, Header, HeaderContainer, Search, Mozaic, Visa, ToDo } from './styles';

export default function Overview() {
  const username = getLocalStorage(STORAGE_USERNAME);

  return (
    <Container>
      <Header>
        <HeaderContainer>
          <Heading className="truncate">Hello, {username}</Heading>
          <p className="truncate">Have a look around! Hope you like it!</p>
        </HeaderContainer>
        <Search />
      </Header>
      <Mozaic>
        <Visa />
        <ToDo />
      </Mozaic>
    </Container>
  );
}
