import { useState, useEffect } from 'react';
import useVisa from '@/hooks/useVisa';
import TextInput from '@/components/TextInput';
import { FieldWrapper, Label } from '../../styles';

export default function ChangeCardName() {
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
        value={card_info.name.get()}
        onEnter={_handleChange}
        minLength={5}
        required
      />
    </FieldWrapper>
  );
}
