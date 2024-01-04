import { useState, useEffect } from 'react';
import useUser from '@/hooks/useUser';
import useActivities from '@/hooks/useActivities';
import useVisa from '@/hooks/useVisa';
import useStorage from '@/hooks/useStorage';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';
import {
  Container,
  Heading,
  Header,
  HeaderContainer,
  Search,
  FieldWrapper,
  Label,
  ControlContainer,
} from './styles';

export default function Settings() {
  const { name } = useUser();

  return (
    <Container className="container">
      {' '}
      <Header>
        <HeaderContainer>
          <Heading className="truncate" title={`This is settings, ${name}`}>
            This is settings, {name}
          </Heading>
          <p className="truncate" title="You can set few things here, try it out!">
            You can set few things here, try it out!
          </p>
        </HeaderContainer>
        <Search />
      </Header>
      <ChangeCardID />
      <ChangeCardName />
      <ControlStorage />
    </Container>
  );
}

const TYPE_OPTIONS = {
  password: 'password',
  text: 'text',
};

function ChangeCardID() {
  const [type, setType] = useState(TYPE_OPTIONS.password);
  const [isSaved, setIsSaved] = useState(false);
  const { changeVisaID, card_info } = useVisa();

  const _handleCensor = () => {
    setType((prev) => (prev === TYPE_OPTIONS.password ? TYPE_OPTIONS.text : TYPE_OPTIONS.password));
  };
  const _handleChange = (v) => {
    changeVisaID(v);
    setIsSaved(true);
  };

  useEffect(() => {
    if (!isSaved) return;

    const timeout = setTimeout(() => setIsSaved(false), 2000);

    return () => clearTimeout(timeout);
  }, [isSaved]);

  return (
    <FieldWrapper>
      <Label htmlFor="card-id" $save={isSaved}>
        Card ID{' '}
        <p>
          must 8 char, press enter to save<span>✓</span>
        </p>
      </Label>
      <TextInput
        id="card-id"
        type={type}
        value={card_info.id.get()}
        onFocus={_handleCensor}
        onBlur={_handleCensor}
        onEnter={_handleChange}
        minLength={8}
        maxLength={8}
        required
        enterKeyHint="done"
      />
    </FieldWrapper>
  );
}

function ChangeCardName() {
  const { name } = useUser();
  const [isSaved, setIsSaved] = useState(false);
  const { changeVisaName, card_info } = useVisa();

  const _handleChange = (v) => {
    changeVisaName(v);
    setIsSaved(true);
  };

  useEffect(() => {
    if (!isSaved) return;

    const timeout = setTimeout(() => setIsSaved(false), 2000);

    return () => clearTimeout(timeout);
  }, [isSaved]);

  return (
    <FieldWrapper>
      <Label htmlFor="card-name" $save={isSaved}>
        Card Name{' '}
        <p>
          min 5 char, press enter to save<span>✓</span>
        </p>
      </Label>
      <TextInput
        id="card-name"
        value={card_info.name.get() || name}
        onEnter={_handleChange}
        minLength={5}
        required
      />
    </FieldWrapper>
  );
}

function ControlStorage() {
  const [isSaved, setIsSaved] = useState(false);
  const { resetLogout, syncAll } = useStorage();

  function _refreshStates() {
    syncAll();
    setIsSaved(true);
  }

  useEffect(() => {
    if (!isSaved) return;

    const timeout = setTimeout(() => setIsSaved(false), 2000);

    return () => clearTimeout(timeout);
  }, [isSaved]);

  return (
    <ControlContainer>
      <Label htmlFor="card-name" $save={isSaved}>
        Storage control{' '}
        <p>
          you can reset or refresh site storage here<span>✓</span>
        </p>
      </Label>
      <div className="option-container">
        <Button onClick={resetLogout}>Reset storage & logout</Button>
        <Button onClick={_refreshStates}>Sync states with storage</Button>
      </div>
    </ControlContainer>
  );
}
