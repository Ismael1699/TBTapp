'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import app from '../services/firebase';

//seste método se tuvo que implementar en este archivo ya que generaba problemas en el archivo firebase.js
const auth = getAuth(app);
const AuthContext = createContext();

// export default function useAuthContext() {
//   return useContext(AuthContext);
// }

export function AuthContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (isLogged) => {
      setIsLogged(isLogged);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged }}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
