import UserPlaceholder from '@/assets/img/user-profile.png';
import { getSessionStorage } from '@/utils/storages';
import { STORAGE_USERNAME } from '@/constants/storages';
import { Container } from './styles';

export default function SideBarUser() {
  const username = getSessionStorage(STORAGE_USERNAME);

  return (
    <Container>
      <h4>Currently logged user</h4>
      <img src={UserPlaceholder} alt={username} />
      <h5>{username}</h5>
      <p>Date of registration here</p>
    </Container>
  );
}
