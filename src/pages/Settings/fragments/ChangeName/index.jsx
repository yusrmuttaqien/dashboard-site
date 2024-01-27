import { useState, useEffect } from 'react';
import useUser from '@/hooks/useUser';
import TextInput from '@/components/TextInput';
import { FieldWrapper, Label } from '../../styles';

export default function ChangeName() {
  const [isSaved, setIsSaved] = useState(false);
  const [isError, setIsError] = useState(false);
  const { changeName, user } = useUser();

  const _handleChange = (v) => {
    try {
      changeName(v);
      setIsSaved(true);
    } catch (e) {
      setIsError(e.message.toLowerCase());
    }
  };

  useEffect(() => {
    if (!isSaved) return;

    const timeout = setTimeout(() => setIsSaved(false), 2000);

    return () => clearTimeout(timeout);
  }, [isSaved]);
  useEffect(() => {
    if (!isError) return;

    const timeout = setTimeout(() => setIsError(false), 2000);

    return () => clearTimeout(timeout);
  }, [isError]);

  return (
    <FieldWrapper>
      <Label htmlFor="user-name" $save={isSaved} $error={isError}>
        Your Name{' '}
        <p>
          {isError || 'min 5 char, press enter to save'}
          <span>✓</span>
          <span className="error-indicator">✕</span>
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
