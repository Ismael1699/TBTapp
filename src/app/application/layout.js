import NavWeb from '@/components/Nav/NavWeb/NavWeb';
import style from './application.module.css';

export const metadata = {
  title: 'Login',
  description: 'Generated by Next.js',
};

export default function RootLayout({ children }) {
  return (
    <div className={style.layout}>
      <NavWeb />
      {children}
    </div>
  );
}
