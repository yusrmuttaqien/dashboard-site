import { useState, useEffect } from 'react';
import { useSubmit, useRouteError } from 'react-router-dom';
import { removeLocalStorage, removeSessionStorage } from '@/utils/storages';
import { resetStates } from '@/utils/states';
import { Main, TextInput } from './styles';

export default function Login() {
  const submit = useSubmit();
  const [isLogging, setisLogging] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const _handleLogin = (username) => {
    setisLogging(true);
    submit(username, { method: 'POST', action: '/', encType: 'text/plain' });
  };

  function _clearOut() {
    removeLocalStorage();
    removeSessionStorage();
    resetStates();
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
