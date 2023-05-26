import app from './firebase';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

const auth = getAuth(app);

const userLogin = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((credentials) => {
      console.log('se ha iniciado sección');
      const user = credentials.user;
      return { user };
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
