import { Container } from './styles';
import { getLocalStorage } from '@/utils/localStorage';
import { STORAGE_USERNAME } from '@/constants/localStorage';

export default function Overview() {
  const username = getLocalStorage(STORAGE_USERNAME);

  return (
    <Container>
      <h3>Hello, {username}</h3>
    </Container>
  );
}
