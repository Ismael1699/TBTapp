'use client';
import { useContext } from 'react';
import AuthContext from '../../contextApp/AuthContext';
import NabarIn from './navbarin';
import NavbarOut from './navbarout';

export default function Navbar() {
  const { isLogged } = useContext(AuthContext);

  return <>{isLogged ? <NabarIn /> : <NavbarOut />}</>;
}
