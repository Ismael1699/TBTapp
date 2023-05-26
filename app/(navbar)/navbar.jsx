'use client';
import { useContext, useEffect } from 'react';
import AuthContext from '../../contextApp/AuthContext.js';
import NavbarIn from './navbarin';
import NavbarOut from './navbarout';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const { isLogged } = useContext(AuthContext);

  return <>{isLogged ? <NavbarIn /> : <NavbarOut />}</>;
}
