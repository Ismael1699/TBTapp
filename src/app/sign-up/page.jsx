'use client';
import login from './sing.module.css';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';

export default function SignUp() {
  const [error, setError] = useState();
  const [succesfully, setSuccesfully] = useState();
  const router = useRouter();

  // Funciones para obtener lo que inserta el usuario en los imputs

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const res = await axios.post('/api/auth/sign-up', {
        user: formData.get('user'),
        email: formData.get('email'),
        rol: formData.get('rol'),
        password: formData.get('password'),
        key: formData.get('key'),
      });

      setSuccesfully('Completado exitosamente');
      setError('');
      sendHome();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    }
  }

  async function sendHome() {
    setTimeout(() => {
      router.push('/application/compras');
    }, '1000');
  }

  return (
    <div className={login.containerSing}>
      <div className={login.contenido}></div>
      <div className={login.inputs}>
        <p className={login.title}>¡Registrate!</p>
        <p className={login.subtitle}>
          Si cuentas con una clave administrador podras crear un cuenta con
          TBTapp.
        </p>
        <form
          onSubmit={handleSubmit}
          className={login.form}
        >
          <input
            className={login.input}
            name='email'
            type='email'
            placeholder='Escribe tu email'
            autoComplete='new-password'
            required
          />

          <input
            className={login.input}
            name='user'
            type='text'
            placeholder='Escribe tu nombre de usuario'
            autoComplete='new-password'
            required
          />
          <select
            name='rol'
            id='rol'
            className={login.select}
            defaultValue=''
            required
          >
            <option
              value=''
              disabled
            >
              Selecione una opción
            </option>
            <option value='MAQUINARIA'>Maquinaria</option>
            <option value='PLANEACION'>Planeación</option>
            <option value='SUPER-INTENDENTE'>SuperIntendente</option>
            <option value='DIRECTOR'>Director</option>
            <option value='CONTADOR'>Contador</option>
            <option value='SUPER-USER-ROOT'>SuperUserRoot</option>
          </select>
          <input
            className={login.input}
            type='password'
            name='password'
            placeholder='Escribe tu contraseña'
            autoComplete='new-password'
            required
          />
          <input
            className={login.input}
            type='password'
            name='key'
            placeholder='Escribe la clabe de administrador'
            autoComplete='new-password'
            required
          />
          <button
            type='submit'
            className={login.styledbutton}
          >
            Enviar
          </button>
        </form>
        {succesfully && (
          <div className={login.alertSucces}>
            <p>{succesfully}</p>
          </div>
        )}
        {error && (
          <div className={login.alert}>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
