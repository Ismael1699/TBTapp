'use client';
import { useContext, useEffect, useState } from 'react';

import NavbarIn from './navbarin';
import NavbarOut from './navbarout';
import NavMobileIn from './NavMobile/NavMobileIn.jsx';
import NavMobileOut from './NavMobile/NavMobileOut.jsx';

export default function Navbar() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 'hola'
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', setSize);
      return () => window.removeEventListener('resize', setSize);
    }
  }, []);

  function setSize() {
    setWidth(window.innerWidth);
  }

  function showContent() {
    return <NavbarIn />;
  }

  return <>{showContent()}</>;
}
