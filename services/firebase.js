import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDdPQs_ApNCT5F0x5PORh6eN1dvj3ZVXm0',
  authDomain: 'database-tbt-4c167.firebaseapp.com',
  projectId: 'database-tbt-4c167',
  storageBucket: 'database-tbt-4c167.appspot.com',
  messagingSenderId: '207729276637',
  appId: '1:207729276637:web:c0e81df1f9a443f25a4d34',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth };
