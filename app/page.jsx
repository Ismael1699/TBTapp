'use client';

import login from './login.module.css';
import { useState } from 'react';
import { auth } from '../services/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    user: '',
    password: '',
  });

  function changeCredentials(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  async function userLogin() {
    try {
      await signInWithEmailAndPassword(
        auth,
        credentials.user,
        credentials.password
      );
      console.log('felicidades estas registrado');
    } catch (error) {
      console.log('lo siento no estas registrado');
    }
  }

  return (
    <div className={login.containerLogin}>
      <h1>Welcome!</h1>
      <form className={login.form}>
        <input
          className={login.input}
          type="text"
          name="user"
          placeholder="Escribe tu usuario"
          value={credentials.user}
          onChange={changeCredentials}
        />
        <input
          className={login.input}
          type="password"
          name="password"
          placeholder="Escribe tu contraseña"
          value={credentials.password}
          onChange={changeCredentials}
        />
      </form>
      <button className={login.styledbutton} onClick={userLogin}>
        Enviar
      </button>
    </div>
  );
}
