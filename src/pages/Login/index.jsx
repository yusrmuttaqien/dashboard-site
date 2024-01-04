import { useState, useEffect } from 'react';
import { useSubmit } from 'react-router-dom';
import useStorage from '@/hooks/useStorage';
import { Main, TextInput } from './styles';

export default function Login() {
  const submit = useSubmit();
  const { resetLogout } = useStorage();
  const [isLogging, setisLogging] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const _handleLogin = (username) => {
    setisLogging(true);
    submit(username, { method: 'POST', action: '/', encType: 'text/plain' });
  };

  function _clearOut() {
    resetLogout(false);
    setIsSaved(true);
  }

  useEffect(() => {
    if (!isSaved) return;

    const timeout = setTimeout(() => setIsSaved(false), 2000);

    return () => clearTimeout(timeout);
  }, [isSaved]);

  return (
    <Main $save={isSaved}>
      <h1>Get inside</h1>
      <p>Type your username below (press enter to continue)</p>
      <TextInput
        id="username"
        placeholder="Username min have 5 characters"
        onEnter={_handleLogin}
        disabled={isLogging}
        minLength={5}
        required
      />
      <p className="helper">
        If you encounter error when logging in,{' '}
        <span onClick={_clearOut}>click here to reset storage</span> <span>✓</span>
      </p>
    </Main>
  );
}
