import { useState, useEffect } from 'react';
import { useHookstate } from '@hookstate/core';
import { CARD_STATE_PROVIDER } from '@/utils/states';
import TextInput from '@/components/TextInput';
import { getLocalStorage } from '@/utils/localStorage';
import { STORAGE_USERNAME } from '@/constants/localStorage';
import { Container, Heading, Header, HeaderContainer, Search, FieldWrapper, Label } from './styles';

export default function Settings() {
  const username = getLocalStorage(STORAGE_USERNAME);

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

  const _handleCensor = () => {
    setType((prev) => (prev === TYPE_OPTIONS.password ? TYPE_OPTIONS.text : TYPE_OPTIONS.password));
  };
  const _handleChange = (v) => {
    cardState.id.set(v);
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
      />
    </FieldWrapper>
  );
}

function ChangeCardName() {
  const [isSaved, setIsSaved] = useState(false);
  const cardState = useHookstate(CARD_STATE_PROVIDER);

  const _handleChange = (v) => {
    cardState.name.set(v);
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
        value={cardState.name.get()}
        onEnter={_handleChange}
        minLength={5}
        required
      />
    </FieldWrapper>
  );
}
