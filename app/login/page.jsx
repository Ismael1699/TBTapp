'use client';

import login from './login.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import auth from '../../services/firebaseAuth';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    user: '',
    password: '',
  });

  const router = useRouter();
  // Funciones para obtener lo que inserta el usuario en los imputs
  function changeCredentials(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className={login.containerLogin}>
      <h1>Welcome!</h1>
      <form className={login.form}>
        <input
          className={login.input}
          name='user'
          type='text'
          placeholder='Escribe tu usuario'
          value={credentials.user}
          onChange={changeCredentials}
        />
        <input
          className={login.input}
          type='password'
          name='password'
          placeholder='Escribe tu contraseña'
          value={credentials.password}
          onChange={changeCredentials}
        />
      </form>
      <button
        className={login.styledbutton}
        onClick={async () => {
          await auth
            .userLogin(credentials.user, credentials.password)
            .then(() => router.push('/'));
        }}
      >
        Enviar
      </button>
    </div>
  );
}
