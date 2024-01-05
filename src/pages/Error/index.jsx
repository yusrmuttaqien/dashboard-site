import { useRouteError } from 'react-router-dom';
import { Container } from './styles';
import useStorage from '@/hooks/useStorage';

export default function Error() {
  const { resetLogout } = useStorage();
  const error = useRouteError();
  console.log(error);

  return (
    <Container>
      <h1>Error has occured</h1>
      <p>please check console (right click (inspect element)) to see error</p>
      <p>
        or <span onClick={resetLogout}>click here</span> to reset storage and logout all account
      </p>
    </Container>
  );
}
