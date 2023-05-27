'use client';
import Image from 'next/image';

export default function App() {
  return (
    <div className='app'>
      <Image src='/public/profile.png' width={200} height={100} />
    </div>
  );
}
