'use client';

import login from './login.module.css';
import { useState } from 'react';

export default function LoginPage() {
  const [user, setUser] = useState('');
  const { password, setPassword } = useState('');

  function userChange(e) {
    return setUser(e.target.value);
  }
  console.log(user);
  return (
    <div className={login.containerLogin}>
      <h1>Welcome!</h1>
      <form className={login.form}>
        <input
          className={login.input}
          type="text"
          name="name"
          placeholder="Escribe tu usuario"
          value={user}
          onChange={userChange}
        />
        <input
          className={login.input}
          type="password"
          name="password"
          placeholder="Escribe tu contraseña"
          value={password}
        />
      </form>
      <button className={login.styledbutton}>Enviar</button>
    </div>
  );
}
