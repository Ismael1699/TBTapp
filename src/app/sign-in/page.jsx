'use client';
import signin from './login.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function SingIn() {
  const [error, setError] = useState();
  const [succesfully, setSuccesfully] = useState();
  const router = useRouter();

  // Funciones para obtener lo que inserta el usuario en los imputs

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (res?.error) return setError(res.error);

    if (res?.ok) {
      setError('');
      setSuccesfully('Se ha iniciado sesión');
      return await sendCompras();
    }
  }

  async function sendCompras() {
    setTimeout(() => {
      router.push('/application/compras');
    }, '1000');
  }

  return (
    <div className={signin.containerLogin}>
      <div className={signin.contenido}></div>
      <div className={signin.inputs}>
        <p className={signin.title}>Welcome our app!</p>
        <p className={signin.subtitle}>
          Por favor ingresa tu cuenta para accesar
        </p>
        <form
          className={signin.form}
          onSubmit={handleSubmit}
        >
          <input
            className={signin.input}
            name='email'
            type='email'
            placeholder='Escribe tu usuario'
            autoComplete='new-password'
          />
          <input
            className={signin.input}
            type='password'
            name='password'
            placeholder='Escribe tu contraseña'
            autoComplete='new-password'
          />
          <button
            type='submit'
            className={signin.styledbutton}
          >
            Enviar
          </button>
        </form>

        {succesfully && (
          <div className={signin.alertSucces}>
            <p>{succesfully}</p>
          </div>
        )}
        {error && (
          <div className={signin.alert}>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
