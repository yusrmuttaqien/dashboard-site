import { useState } from 'react';
import { useSubmit, useRouteError } from 'react-router-dom';
import { Main, TextInput } from './styles';

export default function Login() {
  const submit = useSubmit();
  const [isLogging, setisLogging] = useState(false);

  const _handleLogin = (username) => {
    setisLogging(true);
    submit(username, { method: 'POST', action: '/', encType: 'text/plain' });
  };

  return (
    <Main>
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
    </Main>
  );
}
