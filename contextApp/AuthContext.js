'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import app from '../services/firebase';

const auth = getAuth(app);
export const AuthContext = createContext();
export default function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState(null);
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (isLogged) => {
      isLogged ? setIsLogged(isLogged) : setIsLogged(null);
      // podemos tener un loading
      //setLoading(false)
    });

    console.log(isLogged);

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged }}>{children}</AuthContext.Provider>
  );
}
