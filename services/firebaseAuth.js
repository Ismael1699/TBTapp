import app from './firebase';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import router from 'next/navigation';

const auth = getAuth(app);

const userLogin = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      router.push('/');
      console.log('se ha iniciado seción');
    })
    .catch((error) => {
      console.log('no estas registado');
    });
};

export default { userLogin };
