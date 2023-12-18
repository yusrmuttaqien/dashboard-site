import { getLocalStorage } from '@/utils/localStorage';
import { STORAGE_USERNAME } from '@/constants/localStorage';
import { Container, Heading, Header, HeaderContainer, Magnifier } from './styles';

export default function Overview() {
  const username = getLocalStorage(STORAGE_USERNAME);

  return (
    <Container>
      <Header>
        <HeaderContainer>
          <Heading>Hello, {username}</Heading>
          <p>Have a look around! Hope you like it!</p>
        </HeaderContainer>
        <Magnifier />
      </Header>
    </Container>
  );
}
