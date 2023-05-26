'use client';

import login from './login.module.css';
import { useContext, useState } from 'react';
// import app from '../../services/firebase.js';
// import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
// import AuthContext from '../../contextApp/AuthContext';
import auth from '../../services/firebaseAuth';

// const auth = getAuth(app);

export default function LoginPage() {
  const router = useRouter();
  // const { setIsLogged } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    user: '',
    password: '',
  });

  // Funciones generales de longin
  function changeCredentials(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  // async function userLogin() {
  //   try {
  //     await signInWithEmailAndPassword(
  //       auth,
  //       credentials.user,
  //       credentials.password
  //     );
  //     // setIsLogged(true);
  //     router.push('/');
  //   } catch (error) {
  //     alert('lo siento no estas registrado');
  //   }
  // }

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
          await auth.userLogin(credentials.user, credentials.password);
        }}
      >
        Enviar
      </button>
    </div>
  );
}
