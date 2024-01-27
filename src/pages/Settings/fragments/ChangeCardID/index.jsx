import { useState, useEffect } from 'react';
import useVisa from '@/hooks/useVisa';
import TextInput from '@/components/TextInput';
import { FieldWrapper, Label } from '../../styles';

const TYPE_OPTIONS = {
  password: 'password',
  text: 'text',
};

export default function ChangeCardID() {
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
