'use client';

import login from './login.module.css';
import { useState } from 'react';

export default function LoginPage() {
  const [user, setUser] = useState('Ismael Sarmiento');
  const { password, setPassword } = useState('esta es una pasword');

  return (
    <div className={login.containerLogin}>
      <h1>Welcome!</h1>
      <form className={login.form}>
        <input
          className={login.input}
          type="text"
          name="name"
          placeholder="Escribe tu usuario"
        />
        <input
          className={login.input}
          type="text"
          name="password"
          placeholder="Escribe tu contraseña"
        />
        <input className={login.input} type="submit" value="Submit" />
      </form>
    </div>
  );
}
