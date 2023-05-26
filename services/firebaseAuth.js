import app from './firebase';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import router from 'next/navigation';

const auth = getAuth(app);

const userLogin = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      router.push('/');
      console.log('se ha iniciado seción');
    })
    .catch((error) => {
      console.log('no estas registado');
    });
};

const userLogout = async () => {
  return signOut(auth)
    .then(() => {
      console.log('la operación fue exitosa');
    })
    .catch((error) => {
      console.log('sucedio un error');
    });
};

export default { userLogin, userLogout };
