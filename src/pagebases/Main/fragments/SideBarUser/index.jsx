import useUser from '@/hooks/useUser';
import { Container } from './styles';

export default function SideBarUser() {
  const userData = useUser();

  return (
    <Container>
      <h4>Currently logged user</h4>
      <img src={userData.img} alt={userData.name} />
      <h5>{userData.name}</h5>
      <p>{userData.date}</p>
    </Container>
  );
}
