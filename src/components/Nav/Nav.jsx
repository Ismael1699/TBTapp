'use client';
import NavMobile from './NavMobile/NavMobile';
import NavWeb from './NavWeb/NavWeb';
import { useEffect, useState } from 'react';

export default function Nav() {
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

  return <>{width > 900 ? <NavWeb /> : <NavMobile />}</>;
}
