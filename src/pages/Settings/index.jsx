import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHookstate } from '@hookstate/core';
import useActivities from '@/hooks/useActivities';
import { CARD_STATE_PROVIDER, resetStates, hydrateStates } from '@/utils/states';
import {
  getSessionStorage,
  syncCardLocalStorage,
  removeLocalStorage,
  removeSessionStorage,
} from '@/utils/storages';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';
import { STORAGE_USERNAME } from '@/constants/storages';
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
  const username = getSessionStorage(STORAGE_USERNAME);

  return (
    <Container className="container">
      {' '}
      <Header>
        <HeaderContainer>
          <Heading className="truncate" title={`This is settings, ${username}`}>
            This is settings, {username}
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
  const cardState = useHookstate(CARD_STATE_PROVIDER);
  const { addActivities } = useActivities();

  const _handleCensor = () => {
    setType((prev) => (prev === TYPE_OPTIONS.password ? TYPE_OPTIONS.text : TYPE_OPTIONS.password));
  };
  const _handleChange = (v) => {
    cardState.id.set(v);
    syncCardLocalStorage();
    addActivities({
      title: 'Changed: Visa Card ID',
      type: 'Visa Card',
    });
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
        value={cardState.id.get()}
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
  const [isSaved, setIsSaved] = useState(false);
  const cardState = useHookstate(CARD_STATE_PROVIDER);
  const { addActivities } = useActivities();
  const username = getSessionStorage(STORAGE_USERNAME);

  const _handleChange = (v) => {
    cardState.name.set(v);
    syncCardLocalStorage();
    addActivities({
      title: 'Changed: Visa Card name',
      type: 'Visa Card',
    });
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
        value={cardState.name.get() || username}
        onEnter={_handleChange}
        minLength={5}
        required
      />
    </FieldWrapper>
  );
}

function ControlStorage() {
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  function _clearOut() {
    removeLocalStorage();
    removeSessionStorage();
    resetStates();
    navigate('/login');
  }

  function _refreshStates() {
    hydrateStates();
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
        <Button onClick={_clearOut}>Reset storage & logout</Button>
        <Button onClick={_refreshStates}>Update storage</Button>
      </div>
    </ControlContainer>
  );
}
