'use client';
import { useContext, useEffect } from 'react';
import AuthContext from '../../contextApp/AuthContext';
import NavbarIn from './navbarin';
import NavbarOut from './navbarout';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { isLoged } = AuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoged == null) {
      router.push('/login');
    }
  }, [isLoged]);

  return (
    <>
      <NavbarIn></NavbarIn>
    </>
  );
}
