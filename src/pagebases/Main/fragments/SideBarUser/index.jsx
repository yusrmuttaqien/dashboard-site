import useUser from '@/hooks/useUser';
import { Container } from './styles';

export default function SideBarUser() {
  const { user } = useUser();
  const date = new Date(user.date.get());

  return (
    <Container>
      <h4>Currently logged user</h4>
      <img src={user.img.get()} alt={user.name.get()} />
      <h5>{user.name.get()}</h5>
      <p>
        Created at {date.toLocaleDateString()} {date.toLocaleTimeString()}
      </p>
    </Container>
  );
}
