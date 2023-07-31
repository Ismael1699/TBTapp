import style from './application.module.css';
import dynamic from 'next/dynamic';

export const metadata = {
  title: 'TBT-app',
  description: '',
};

const Nav = dynamic(() => import('@/components/Nav/Nav'), { ssr: false });

export default function RootLayout({ children }) {
  return (
    <div className={style.layout}>
      <Nav />
      {children}
    </div>
  );
}
