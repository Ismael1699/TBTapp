import Navbar from './(navbar)/navbar';
import style from './application.module.css';

export const metadata = {
  title: 'Login',
  description: 'Generated by Next.js',
};

export default function RootLayout({ children }) {
  return (
    <div className={style.layout}>
      <Navbar />
      {children}
    </div>
  );
}
