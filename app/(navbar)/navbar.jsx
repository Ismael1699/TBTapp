'use client';
import { useContext, useEffect } from 'react';
import AuthContext from '../../contextApp/AuthContext.js';
import NavbarIn from './navbarin';
import NavbarOut from './navbarout';

export default function Navbar() {
  const { isLogged } = useContext(AuthContext);

  return <>{isLogged ? <NavbarIn /> : <NavbarOut />}</>;
}
