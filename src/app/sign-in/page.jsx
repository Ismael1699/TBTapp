'use client';
import signin from './login.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function SingIn() {
  const [error, setError] = useState();
  const [succesfully, setSuccesfully] = useState();
  const router = useRouter();
  const { data: session, status, update } = useSession();

  useEffect(
    () =>
      status === 'authenticated'
        ? router.push(location.origin + '/application')
        : undefined,
    [status, router]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (res.error) return setError(res.error);

    if (res.ok) {
      setError('');
      setSuccesfully('Se ha iniciado sesión');
      router.refresh();
    }
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
          <label htmlFor='email'>Correo</label>
          <input
            className={signin.input}
            id='email'
            type='email'
            placeholder='ejemplo@tbtsa.com.mx'
            autoComplete='new-password'
          />
          <label htmlFor='password'>Contraseña</label>
          <input
            className={signin.input}
            type='password'
            id='password'
            placeholder='Escribe tu contraseña aqui'
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
