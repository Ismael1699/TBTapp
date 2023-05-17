// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyDaLDdF748T7-2QGL8NvTqTF111HOY17MU',
  authDomain: 'database-tbt.firebaseapp.com',
  projectId: 'database-tbt',
  storageBucket: 'database-tbt.appspot.com',
  messagingSenderId: '352228707504',
  appId: '1:352228707504:web:97fdafabc8742a9245ff75',
  measurementId: 'G-8NR67HECZ9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
export { auth };
