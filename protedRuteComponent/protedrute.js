import { useRouter } from 'next/navigation';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../contextApp/AuthContext';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  return loading ? <div>Cargando...</div> : <>{children}</>;
};

export default ProtectedRoute;
