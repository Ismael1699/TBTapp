'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useContext } from 'react';
import AuthContext from '../contextApp/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLogged } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      router.push('/login');
    }
  }, [isLogged, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
