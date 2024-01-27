import useUser from '@/hooks/useUser';
import ChangeCardID from './fragments/ChangeCardID';
import ChangeCardName from './fragments/ChangeCardName';
import ControlStorage from './fragments/ControlStorage';
import ChangeName from './fragments/ChangeName';
import ChangePicture from './fragments/ChangePicture';
import DeleteAccount from './fragments/DeleteAccount';
import {
  Container,
  Heading,
  Header,
  HeaderContainer,
  Search,
  Label,
  ControlContainer,
} from './styles';

export default function Settings() {
  const { user } = useUser();

  return (
    <Container className="container">
      <Header>
        <HeaderContainer>
          <Heading className="truncate" title={`This is settings, ${user.name.get()}`}>
            This is settings, {user.name.get()}
          </Heading>
          <p className="truncate" title="You can set few things here.">
            You can set few things here.
          </p>
        </HeaderContainer>
        <Search />
      </Header>
      <ChangeName />
      <ChangePicture />
      <ChangeCardID />
      <ChangeCardName />
      <DeleteAccount />
      <ControlStorage />
    </Container>
  );
}
