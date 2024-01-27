import { useState, useEffect } from 'react';
import useUser from '@/hooks/useUser';
import TextInput from '@/components/TextInput';
import { FieldWrapper, Label } from '../../styles';

export default function ChangeName() {
  const [isSaved, setIsSaved] = useState(false);
  const { changeName, user } = useUser();

  const _handleChange = (v) => {
    changeName(v);
    setIsSaved(true);
  };

  useEffect(() => {
    if (!isSaved) return;

    const timeout = setTimeout(() => setIsSaved(false), 2000);

    return () => clearTimeout(timeout);
  }, [isSaved]);

  return (
    <FieldWrapper>
      <Label htmlFor="user-name" $save={isSaved}>
        Your Name{' '}
        <p>
          min 5 char, press enter to save<span>✓</span>
        </p>
      </Label>
      <TextInput
        id="user-name"
        value={user.name.get()}
        onEnter={_handleChange}
        minLength={5}
        required
      />
    </FieldWrapper>
  );
}
